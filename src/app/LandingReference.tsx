import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';

type LandingReferenceProps = { onStart: () => void };

const steps = [
  ['Вы загружаете данные', 'Остатки на счетах и в кассе, будущие расходы и поступления от клиентов'],
  ['Ассистент разбирает операции на категории', 'К какой статье отнести ту или иную операцию, основываясь на данных платежа'],
  ['Вы получаете отчёт и выводы', 'И узнаёте, в какие дни остатка на счёте может быть недостаточно, чтобы покрыть траты'],
];

const answers = [
  ['answer-1.svg', 'Хватит ли денег на ближайшие 30 дней?', 'Смотрите общий остаток денег компании и суммы на отдельных счетах и в кассах. Принимайте решения, видя полную картину.'],
  ['answer-2.svg', 'Когда остаток будет минимальным?', 'Узнайте, какие поступления и выплаты изменили остаток за период. Разберитесь, сколько денег ушло на текущую работу, развитие бизнеса и погашение кредитов.'],
  ['answer-3.svg', 'Есть ли риск кассового разрыва?', 'Сравнивайте траты за разные периоды, замечайте растущие расходы и неожиданные списания. Определяйте, какие статьи стоит пересмотреть.'],
  ['answer-4.svg', 'Контролируйте финансы без разбора выписок?', 'Следите за поступлениями, расходами и остатками в готовом отчёте с компьютера или смартфона.'],
  ['number-five-circle.png', 'Планируйте, сколько денег забрать себе?', 'Оцените ожидаемый остаток после предстоящих платежей и необходимого резерва.'],
];

function Mark() {
  return <span className="reference-landing-mark">точка<br />банк</span>;
}

function PrimaryButton({ children, onClick, type = 'button' }: { children: ReactNode; onClick?: () => void; type?: 'button' | 'submit' }) {
  return <button className="reference-landing-button" type={type} onClick={onClick}>{children}</button>;
}

export function LandingReference({ onStart }: LandingReferenceProps) {
  const heroSentinel = useRef<HTMLDivElement>(null);
  const footerSentinel = useRef<HTMLDivElement>(null);
  const [heroPassed, setHeroPassed] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  useEffect(() => {
    const target = heroSentinel.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = footerSentinel.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => setBottomVisible(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onStart();
  };

  return <div className="reference-landing">
    <header className="reference-landing-header"><Mark /></header>
    <main className="reference-landing-main">
      <h1 className="reference-landing-visually-hidden">Наконец-то деньги бизнеса под контролем</h1>
      <div className="cash-runway-hero-wrap">
        <section className="cash-runway-hero">
          <div className="cash-runway-hero__content">
            <h2>Наконец-то деньги бизнеса под контролем</h2>
            <p>Покажем, сколько и на что потратили, а сколько и за что получили. Всегда быть в курсе, что происходит с деньгами в компании</p>
            <PrimaryButton onClick={onStart}>Проверить расходы</PrimaryButton>
          </div>
          <div className="cash-runway-hero__image"><img src="/assets/object-317.png" alt="Аналитика движения денег" /></div>
        </section>
        <div ref={heroSentinel} className="reference-landing-sentinel" aria-hidden="true" />
      </div>

      <section className="reference-landing-section">
        <h2>Контроль поступлений и списаний</h2>
        <div className="reference-landing-split">
          <div className="reference-landing-split-copy"><h3>Знайте реальное положение дел компании</h3><p>Следите как ваши решения влияют на рост поступлений. В отчёт попадают все операции и группируются по статьям: зарплата, содержание офиса, аренда.</p></div>
          <div className="reference-landing-split-media"><img src="/assets/outcoms.png" alt="Пример отчёта о движении денег" /></div>
        </div>
      </section>

      <section className="reference-landing-section">
        <h2>Соберите отчёт за несколько минут с помощью ИИ</h2>
        <div className="reference-landing-how">
          <ol>{steps.map(([title, description], index) => <li key={title}><b>{index + 1}</b><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
          <aside><img src="/assets/landing-page-advertising-campaign.png" alt="Автоматическое распределение операций" /><div><h3>Автоматическое разнесение операций по статьям</h3><p>Бесплатно, без регистрации и СМС</p></div><PrimaryButton onClick={onStart}>Попробовать</PrimaryButton></aside>
        </div>
      </section>

      <section className="reference-landing-section">
        <h2>Не ограничивайтесь цифрами</h2>
        <div className="reference-landing-preview"><div><h3>Используйте время эффективнее</h3><p>Инсайты вовремя подсвечивают категории поступлений и трат, куда необходимо обратить внимание.</p></div><img src="/assets/image.png" alt="Инсайты и анализ бизнеса" /></div>
      </section>

      <section className="reference-landing-section">
        <h2>Вы получите ответы на вопросы</h2>
        <div className="reference-landing-answers">{answers.map(([icon, title, description]) => <article key={title}><img src={`/assets/cash-runway/${icon}`} alt="" /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </section>

      <section className="reference-landing-cta">
        <div><h2>Отчёт помогает управлять компанией в кризис</h2><p>Оставьте данные — мы свяжемся с вами для демонстрации сервиса</p></div>
        <form onSubmit={submit}><input aria-label="Телефон" type="tel" placeholder="+7 900 000-00-00" required /><input aria-label="Имя" type="text" placeholder="Имя" required /><PrimaryButton type="submit">Получить прогноз</PrimaryButton><small>Нажимая, вы соглашаетесь на обработку персональных данных</small></form>
      </section>
    </main>
    <div ref={footerSentinel} className="reference-landing-sentinel" aria-hidden="true" />
    <footer className="reference-landing-footer">Расчёт носит справочный характер и не является индивидуальной инвестиционной рекомендацией.</footer>
    <div className={`reference-landing-sticky${heroPassed && !bottomVisible ? ' is-visible' : ''}`}><PrimaryButton onClick={onStart}>Попробовать</PrimaryButton></div>
  </div>;
}
