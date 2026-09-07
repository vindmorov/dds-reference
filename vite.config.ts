import { defineConfig, type Connect } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function assistantApi(): { name: string; configureServer: (server: { middlewares: { use: Connect.NextHandleFunction } }) => void } {
  return {
    name: 'assistant-api',
    configureServer(server) {
      server.middlewares.use('/api/assistant', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Метод не поддерживается' }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(Buffer.from(chunk));

        try {
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as { message?: string };
          const message = body.message?.trim();
          if (!message) throw new Error('Введите сообщение');

          const apiKey = process.env.OPENROUTER_API_KEY;
          if (!apiKey) throw new Error('Не настроен OPENROUTER_API_KEY. Добавьте ключ в .env');

          const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'http://127.0.0.1:5173',
              'X-Title': 'DDS Assistant',
            },
            body: JSON.stringify({
              model: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash-lite',
              messages: [
                { role: 'system', content: 'Ты краткий и полезный ИИ-ассистент сервиса анализа финансов бизнеса. Отвечай на русском языке, простыми словами, максимум в 5 коротких предложениях.' },
                { role: 'user', content: message },
              ],
              max_tokens: 350,
              temperature: 0.3,
            }),
          });
          const data = await upstream.json() as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } };
          if (!upstream.ok) throw new Error(data.error?.message || 'Ошибка AI-провайдера');

          const answer = data.choices?.[0]?.message?.content?.trim();
          if (!answer) throw new Error('AI-провайдер не вернул ответ');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ answer }));
        } catch (error) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Не удалось обработать запрос' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    assistantApi(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
