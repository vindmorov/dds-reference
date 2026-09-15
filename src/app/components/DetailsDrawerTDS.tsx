import { ArrowRight, Copy, Send, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { PageAction } from '../../../vendor/t-ds/src';
import { WatchTimer, CheckmarkCircle } from '../../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { AIInsight, FinanceRow, formatCurrency, getCategoryName } from '../data/financeData';

interface DetailsDrawerTDSProps { isOpen: boolean; insight: AIInsight | null; relatedRows: FinanceRow[]; onClose: () => void; onNavigateToRow: (rowId: string) => void; onAction?: (action: 'review' | 'plan' | 'article' | 'snooze' | 'resolve') => void; }

export function DetailsDrawerTDS({ isOpen, insight, relatedRows, onClose, onNavigateToRow, onAction }: DetailsDrawerTDSProps) {
  if (!isOpen || !insight) return null;
  const isOpportunity = insight.severity === 'opportunity';
  const recommendations = [
    insight.recommendation,
    'Установить программу лояльности для крупных клиентов',
    'Создать резервный фонд на случай потери ключевого клиента',
  ];
  return <>
    <div className="insight-drawer-backdrop" onClick={onClose} />
    <aside className="insight-dialog" aria-label="ИИ-Ассистент">
      <header className="insight-dialog-header"><span aria-hidden="true" /><h2>ИИ-Ассистент</h2><button type="button" aria-label="Закрыть" onClick={onClose}><X /></button></header>
      <div className="insight-dialog-content">
        <div className="insight-user-message">{insight.title}.<br />Что делать с этим?</div>
        <div className="insight-assistant-label"><span>А<small>✦</small></span><strong>AI-Ассистент</strong></div>
        <div className={`insight-dialog-severity ${isOpportunity ? 'is-opportunity' : ''}`}>{isOpportunity ? 'Рекомендация' : 'Риск'}</div>
        <h3>Что значит «{insight.title}»?</h3>
        <p className="insight-dialog-copy">{insight.description}</p>
        <p className="insight-dialog-copy">Это влияет на устойчивость бизнеса. Следите за динамикой показателей в течение года и принимайте решение по связанным категориям.</p>
        <h4>Ассистент рекомендует вам:</h4>
        <div className="insight-recommendations">{recommendations.map((recommendation, index) => <button type="button" key={index} onClick={() => relatedRows[index] && onNavigateToRow(relatedRows[index].id)}><span>{recommendation}</span><ArrowRight /></button>)}</div>
        <h4 className="related-title">Связанные категории:</h4>
        <div className="insight-related-rows">{relatedRows.map(row => <button type="button" key={row.id} onClick={() => onNavigateToRow(row.id)}><span><small>{getCategoryName(row.category)}</small>{row.name}</span><strong>{formatCurrency(row.total)}</strong></button>)}</div>
        <div className="insight-action-list"><PageAction title="Отложить инсайт" leftAccessory={<WatchTimer className="insight-action-icon" />} onClick={() => onAction?.('snooze')} /><PageAction title="Отметить решённым" leftAccessory={<CheckmarkCircle className="insight-action-icon" />} onClick={() => onAction?.('resolve')} variant="danger" /></div>
        <div className="insight-feedback"><button type="button" aria-label="Копировать"><Copy /></button><button type="button" aria-label="Полезно"><ThumbsUp /></button><button type="button" aria-label="Не полезно"><ThumbsDown /></button></div>
        <div className="insight-dialog-input"><input placeholder="Спросить ИИ-Ассистента" /><button type="button" aria-label="Отправить"><Send /></button></div>
      </div>
    </aside>
  </>;
}
