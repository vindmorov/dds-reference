import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Chip, FeedbackBanner, MainPageNavigationBar, Table, TableCell } from '../../vendor/t-ds/src';
import { ChevronDown, ChevronRight, ChevronUp, Plus } from '../../vendor/t-ds/src/assets/Icon/icons';
import { ChevronLeft } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { MoneyAcceptorArrowUp, Wallet } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { CoinsRuble } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { ArrowLeft } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { DetailsDrawerTDS } from './components/DetailsDrawerTDS';
import { aiInsights, financeRows, type AIInsight, type FinanceRow, type RowCategory, formatCurrency } from './data/financeData';
import { initialDDSFlowState, type AppRoute, type ProductStage } from './state/ddsFlow';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';

const months = [['jan', 'Янв'], ['feb', 'Фев'], ['mar', 'Мар'], ['apr', 'Апр'], ['may', 'Май'], ['jun', 'Июн']] as const;
const categories = [{ key: 'operating', title: 'Операционная деятельность', icon: <MoneyAcceptorArrowUp /> }, { key: 'investment', title: 'Инвестиционная деятельность', icon: <CoinsRuble /> }, { key: 'financial', title: 'Финансовая деятельность', icon: <Wallet /> }] as const;
const insightPresentation = [
  { label: 'Риск', title: 'Маркетинг и реклама', description: 'Расходы выросли на 50% за январь–июнь, а конверсия снизилась на 12%' },
  { label: 'Риск', title: 'Получение и погашение кредитов', description: 'Долговая нагрузка — 3,5 млн ₽, выплаты составляют 15% от выручки' },
  { label: 'Рекомендация', title: 'Покупка оборудования', description: 'Разовые платежи создают кассовые разрывы: от −850 тыс. до −1,2 млн ₽' },
]; 
const categoryOptions = [
  'Выручка от продаж', 'Оплата от клиентов', 'Возвраты от поставщиков', 'Проценты по счетам', 'Гранты и субсидии', 'Прочие поступления',
  'Зарплата сотрудников', 'Налоги и сборы', 'Аренда помещений', 'Коммунальные услуги', 'Маркетинг и реклама', 'Материалы и расходники',
  'Программное обеспечение и подписки', 'Связь и интернет', 'Услуги подрядчиков', 'Логистика и доставка', 'Командировочные расходы',
  'Представительские расходы', 'Банковские комиссии', 'Покупка оборудования', 'Ремонт и обслуживание', 'Погашение кредитов',
  'Лизинговые платежи', 'Страхование', 'Юридические и бухгалтерские услуги', 'Обучение сотрудников', 'Прочие операционные расходы'
];

function getTrendSummary(rows: FinanceRow[]): string {
  const counts = rows.reduce((result, row) => {
    const first = Math.abs(row.data.jan);
    const last = Math.abs(row.data.jun);
    if (first === last) result.neutral += 1;
    else if (last > first) result.rising += 1;
    else result.falling += 1;
    return result;
  }, { rising: 0, falling: 0, neutral: 0 });
  const parts = [
    counts.rising && `${counts.rising} ${counts.rising === 1 ? 'категория растёт' : 'категории растут'}`,
    counts.falling && `${counts.falling} ${counts.falling === 1 ? 'категория снижается' : 'категории снижаются'}`,
    counts.neutral && `${counts.neutral} ${counts.neutral === 1 ? 'без изменений' : 'без изменений'}`,
  ].filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Нет данных для сравнения';
}

function CategoryDropdown({ value, placeholder, onChange, disabled = false }: { value?: string; placeholder: string; onChange: (value: string) => void; disabled?: boolean }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filteredOptions = categoryOptions.filter(option => option.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);
  const selectOption = (option: string) => { onChange(option); setQuery(''); setOpen(false); };
  return <div ref={dropdownRef} className={`category-search-dropdown ${open ? 'is-open' : ''}`}>
    <button className="category-search-trigger" type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <span>{value || placeholder}</span><ChevronDown aria-hidden="true" />
    </button>
    {open && <div className="category-search-menu" role="listbox">
      <input autoFocus className="category-search-input" value={query} onChange={event => setQuery(event.target.value)} placeholder="Найти категорию" aria-label="Поиск категории" />
      <div className="category-search-options">
        {filteredOptions.length ? filteredOptions.map(option => <button className={option === value ? 'is-selected' : ''} key={option} type="button" role="option" aria-selected={option === value} onClick={() => selectOption(option)}>{option}</button>) : <span className="category-search-empty">Категория не найдена</span>}
      </div>
    </div>}
  </div>;
}

function ReviewProgress({ pending, processed }: { pending: number; processed: number }) {
  const total = pending + processed;
  const progress = total ? Math.round((processed / total) * 100) : 100;
  return <div className="review-progress" aria-label={`Обработано ${processed} из ${total} операций`}>
    <div className="review-progress-label"><span><b>{processed}</b> обработано</span><span><b>{pending}</b> осталось</span><strong>{progress}%</strong></div>
    <div className="review-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={processed}><span style={{ width: `${progress}%` }} /></div>
  </div>;
}

function OnboardingStep({ current, total }: { current: number; total: number }) {
  return <span className="onboarding-step" aria-label={`Шаг ${current} из ${total}`}>Шаг {current} из {total}</span>;
}

function buildAnalyticsRows(items: ReviewItem[]): FinanceRow[] {
  if (!items.length) return financeRows;
  const grouped = new Map<string, FinanceRow>();
  items.forEach(item => {
    const category = item.amount >= 0 ? 'operating' : item.description.toLowerCase().includes('кредит') ? 'financial' : item.description.toLowerCase().includes('оборуд') ? 'investment' : 'operating';
    const key = `${category}-${item.category}`;
    const row = grouped.get(key) ?? { id: `import-${grouped.size}`, category: category as RowCategory, name: item.category, description: `Импортировано из ${item.counterparty}`, data: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0 }, total: 0 };
    const month = Number(item.date.slice(5, 7));
    const monthKey = (['jan', 'feb', 'mar', 'apr', 'may', 'jun'] as const)[month - 1] ?? 'jan';
    row.data[monthKey] += item.amount;
    row.total += item.amount;
    grouped.set(key, row);
  });
  return [...grouped.values()];
}

function buildDynamicInsights(rows: FinanceRow[]): AIInsight[] {
  const insights = rows.map((row, index) => {
    const first = row.data.jan;
    const last = row.data.jun;
    const delta = Math.abs(first) > 0 ? Math.round(((Math.abs(last) - Math.abs(first)) / Math.abs(first)) * 100) : last !== 0 ? 100 : 0;
    const isExpense = row.total < 0;
    const significant = Math.abs(delta) >= 15;
    if (!significant) return null;
    const rising = delta > 0;
    const severity: AIInsight['severity'] = isExpense && rising ? 'critical' : rising ? 'opportunity' : 'warning';
    return { id: `dynamic-${row.id}`, severity, title: `${rising ? 'Рост' : 'Снижение'} категории «${row.name}»`, description: `${isExpense ? 'Расходы' : 'Поступления'} изменились на ${Math.abs(delta)}% за январь–июнь.`, relatedRowIds: [row.id], recommendation: rising && isExpense ? 'Проверьте операции категории и сравните рост расходов с изменением выручки.' : 'Изучите динамику по месяцам и обновите план на следующий период.', impact: `Изменение за период: ${delta > 0 ? '+' : ''}${delta}%` } satisfies AIInsight;
  }).filter((insight): insight is AIInsight => Boolean(insight));
  const positiveInsights = rows.filter(row => row.total >= 0).slice(0, 3).map(row => ({
    id: `positive-${row.id}`,
    severity: 'opportunity' as const,
    title: `Поступления «${row.name}»`,
    description: 'Категория формирует положительный денежный поток и поддерживает результат бизнеса.',
    relatedRowIds: [row.id],
    recommendation: 'Сохраните текущую динамику и используйте категорию как ориентир для планирования.',
    impact: `Итого: ${formatCurrency(row.total)}`
  } satisfies AIInsight));
  const fallback = aiInsights.slice(0, Math.max(1, Math.min(3, rows.length))).map((insight, index) => ({ ...insight, relatedRowIds: rows[index] ? [rows[index].id] : insight.relatedRowIds }));
  return [...insights, ...positiveInsights, ...fallback].slice(0, 5);
}

function CashFlowTable({ title, icon, rows, onRowClick, onAdd, onOpenDetail, onOpenActivity, viewMode, highlightedRowIds, insights }: { title: string; icon: ReactNode; rows: FinanceRow[]; onRowClick: (row: FinanceRow) => void; onAdd: () => void; onOpenDetail: (mode: 'incoming' | 'outgoing') => void; onOpenActivity: () => void; viewMode: 'simple' | 'table'; highlightedRowIds: string[]; insights: AIInsight[] }) {
  const [openGroups, setOpenGroups] = useState<{ incoming: boolean; outgoing: boolean }>({ incoming: false, outgoing: false });
  const incomingRows = rows.filter(row => row.total >= 0);
  const outgoingRows = rows.filter(row => row.total < 0);
  useEffect(() => {
    const highlighted = highlightedRowIds.filter(id => rows.some(row => row.id === id));
    if (!highlighted.length) return;
    setOpenGroups(state => ({ ...state, incoming: state.incoming || highlighted.some(id => incomingRows.some(row => row.id === id)), outgoing: state.outgoing || highlighted.some(id => outgoingRows.some(row => row.id === id)) }));
    const timer = window.setTimeout(() => highlighted.forEach(id => document.querySelector(`[data-cashflow-row-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })), 80);
    return () => window.clearTimeout(timer);
  }, [highlightedRowIds, rows]);
  const getInsightCount = (groupRows: FinanceRow[]) => insights.filter(insight => insight.relatedRowIds.some(rowId => groupRows.some(row => row.id === rowId))).length;
  const incomingInsightCount = getInsightCount(incomingRows);
  const outgoingInsightCount = getInsightCount(outgoingRows);
  const groupTotal = (groupRows: FinanceRow[], key: typeof months[number][0], mode: 'incoming' | 'outgoing') => groupRows.reduce((sum, row) => sum + (mode === 'incoming' ? Math.max(row.data[key], 0) : Math.min(row.data[key], 0)), 0);
  const renderMonthlyCells = (getValue: (key: typeof months[number][0]) => number, valueClass = '') => months.map(([key]) => {
    const value = getValue(key);
    return <span className={`cashflow-cell ${valueClass}`} key={key}>{formatCurrency(value)}</span>;
  });
  const renderGroup = (label: string, groupRows: FinanceRow[], mode: 'incoming' | 'outgoing') => <>
    <button className={`cashflow-row cashflow-group-row cashflow-level-2 ${groupRows.length ? '' : 'is-empty'}`} role="row" type="button" onClick={groupRows.length ? () => setOpenGroups(state => ({ ...state, [mode]: !state[mode] })) : undefined} aria-expanded={groupRows.length ? openGroups[mode] : undefined}><span className="cashflow-cell category-cell">{label} <ChevronUp className={openGroups[mode] ? '' : 'is-collapsed'} aria-hidden="true" /></span>{renderMonthlyCells(key => groupTotal(groupRows, key, mode))}<span className="cashflow-cell">{formatCurrency(groupRows.reduce((sum, row) => sum + (mode === 'incoming' ? Math.max(row.total, 0) : Math.min(row.total, 0)), 0))}</span></button>
    {openGroups[mode] && groupRows.map(row => <button className={`cashflow-row data-row cashflow-level-3 ${highlightedRowIds.includes(row.id) ? 'is-highlighted' : ''}`} data-cashflow-row-id={row.id} key={row.id} type="button" onClick={() => onRowClick(row)}><span className="cashflow-cell category-cell">{highlightedRowIds.includes(row.id) && <span className="cashflow-row-alert" aria-label="Связанный инсайт">i</span>}{row.name}</span>{renderMonthlyCells(key => row.data[key], row.total < 0 ? 'negative' : '')}<span className={`cashflow-cell ${row.total < 0 ? 'negative' : ''}`}>{formatCurrency(row.total)}</span></button>)}
  </>;
  const incomeTotal = rows.reduce((sum, row) => sum + Object.values(row.data).filter(value => value > 0).reduce((rowSum, value) => rowSum + value, 0), 0);
  const expenseTotal = rows.reduce((sum, row) => sum + Object.values(row.data).filter(value => value < 0).reduce((rowSum, value) => rowSum + Math.abs(value), 0), 0);
  return <section className="cashflow-section">
    <button className={`section-title ${viewMode === 'table' ? 'is-static' : ''}`} type="button" onClick={viewMode === 'simple' ? onOpenActivity : undefined} aria-label={`Открыть ${title}`}>
      <h2><span className="section-icon" aria-hidden="true">{icon}</span>{title}</h2>
    </button>
    <div className="cashflow-table" role="table" aria-label={title}>
      <div className="cashflow-row cashflow-header" role="row"><div className="cashflow-cell category-cell">Направление категории</div>{months.map(([, label]) => <div className="cashflow-cell" key={label}>{label}</div>)}<div className="cashflow-cell">Всего</div></div>
      {renderGroup('Поступления', incomingRows, 'incoming')}
      {renderGroup('Списания', outgoingRows, 'outgoing')}
      <button className="cashflow-add" type="button" onClick={onAdd}><Plus aria-hidden="true" />Добавить статью</button>
    </div>
    <div className="mobile-category-summary">
      <button type="button" onClick={() => onOpenDetail('incoming')}><span className="mobile-summary-copy"><strong>+{formatCurrency(incomeTotal)}</strong><small>Поступления</small><em>{getTrendSummary(incomingRows)}</em></span><span className="mobile-summary-actions"><b>{incomingInsightCount}</b><ChevronDown className="mobile-chevron" /></span></button>
      <button type="button" onClick={() => onOpenDetail('outgoing')}><span className="mobile-summary-copy"><strong>-{formatCurrency(expenseTotal)}</strong><small>Списания</small><em>{getTrendSummary(outgoingRows)}</em></span><span className="mobile-summary-actions"><b>{outgoingInsightCount}</b><ChevronDown className="mobile-chevron" /></span></button>
    </div>
  </section>;
}

function MobileActivityDetail({ activityTitle, mode, rows, onBack }: { activityTitle: string; mode: 'incoming' | 'outgoing'; rows: FinanceRow[]; onBack: () => void }) {
  const label = mode === 'incoming' ? 'Приход' : 'Расход';
  const visibleRows = rows.filter(row => mode === 'incoming' ? row.total >= 0 : row.total < 0);
  return <div className="mobile-detail-page">
    <div className="mobile-detail-heading"><button type="button" aria-label="Назад" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><div><strong>ДДС</strong><span>Детализация</span></div></div>
    <div className="mobile-detail-title"><div><p>{activityTitle}</p><h1>{label}</h1></div></div>
    <div className="mobile-detail-alert"><span>i</span><p>Здесь собраны категории и их динамика за 6 месяцев</p></div>
    <div className="mobile-detail-list">{visibleRows.map(row => <article className="mobile-detail-category" key={row.id}><div className="mobile-detail-category-heading"><h2>{row.name}</h2><span>{row.data.jun === row.data.jan ? 'Без изменений' : Math.abs(row.data.jun) > Math.abs(row.data.jan) ? 'Рост' : 'Снижение'}</span></div><div className="mobile-detail-values">{months.map(([key, month]) => <div key={key}><span>{month}</span><strong className={row.data[key] < 0 ? 'negative' : ''}>{formatCurrency(Math.abs(row.data[key]))}</strong></div>)}<div className="mobile-detail-total"><span>Всего</span><strong className={row.total < 0 ? 'negative' : ''}>{formatCurrency(Math.abs(row.total))}</strong></div></div></article>)}</div>
  </div>;
}

function ActivityDetailPage({ activityTitle, rows, onBack }: { activityTitle: string; rows: FinanceRow[]; onBack: () => void }) {
  const [openGroups, setOpenGroups] = useState({ incoming: false, outgoing: false });
  const groups = [{ key: 'incoming' as const, label: 'Поступления', items: rows.filter(row => row.total >= 0) }, { key: 'outgoing' as const, label: 'Списания', items: rows.filter(row => row.total < 0) }];
  return <div className="activity-detail-page"><div className="activity-detail-heading"><button type="button" aria-label="Назад" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><div><strong>ДДС</strong><span>{activityTitle}</span></div></div><div className="activity-detail-notice">Примите решение по категориям, которые требуют вашего внимания, их можно оптимизировать</div><h1>{activityTitle}</h1><div className="activity-flow-list">{groups.map(group => <section key={group.key}><button className="activity-flow-toggle" type="button" onClick={() => setOpenGroups(state => ({ ...state, [group.key]: !state[group.key] }))} aria-expanded={openGroups[group.key]}><span><strong>{group.label}</strong><small>{group.items.length} категорий</small></span><span className="activity-flow-total">{formatCurrency(group.items.reduce((sum, row) => sum + row.total, 0))}<ChevronDown className={openGroups[group.key] ? '' : 'is-collapsed'} /></span></button>{openGroups[group.key] && <div className="activity-flow-items">{group.items.map(row => <div className="activity-flow-item" key={row.id}><span>{row.name}</span><strong className={row.total < 0 ? 'negative' : ''}>{formatCurrency(row.total)}</strong></div>)}</div>}</section>)}</div></div>;
}

function CreateExpensePage({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [name, setName] = useState('');
  const [currentPlan, setCurrentPlan] = useState('');
  const [nextPlan, setNextPlan] = useState('');
  const [category, setCategory] = useState('');
  const [fund, setFund] = useState(false);
  return <div className="create-page">
    <div className="create-form">
      <label className="create-field"><span>Название</span><input value={name} onChange={event => setName(event.target.value)} placeholder="Введите название статьи" /></label>
      <label className="create-field"><span>План на текущий месяц</span><input value={currentPlan} onChange={event => setCurrentPlan(event.target.value)} placeholder="0 ₽" inputMode="numeric" /></label>
      <label className="create-field"><span>План на следующий месяц</span><input value={nextPlan} onChange={event => setNextPlan(event.target.value)} placeholder="0 ₽" inputMode="numeric" /></label>
      <section className="create-category"><h2>Что относится к статье</h2><p>Выберите одну или несколько категорий Аналитики, которые будут учитываться как траты по статье.<br />Категория может быть связана только с одной статьёй расходов.</p><label className="create-field create-select"><span>Категория</span><select value={category} onChange={event => setCategory(event.target.value)}><option value="">Выберите категорию</option><option>Маркетинг</option><option>Зарплата</option><option>Аренда</option><option>Материалы</option></select></label></section>
      <label className="fund-toggle"><span><strong>Фонд</strong><small>Поможет откладывать на расходы автоматически</small></span><input type="checkbox" checked={fund} onChange={event => setFund(event.target.checked)} /><i aria-hidden="true" /></label>
      <button className="create-submit" type="button" onClick={onSubmit}>Добавить статью расходов</button>
    </div>
  </div>;
}

function ProductMark() {
  return <div className="product-mark"><span>точка</span><span>банк</span></div>;
}

function readStored<T>(key: string, fallback: T): T {
  try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return <div className="onboarding-page landing-page">
    <header className="onboarding-header"><ProductMark /><button className="onboarding-login" type="button" onClick={onStart}>Войти</button></header>
    <main className="landing-content">
      <div className="landing-copy"><h1>Поймите, куда уходят деньги вашего бизнеса</h1><p>Загрузите выписку — DDS покажет динамику по категориям, найдёт зоны внимания и подскажет, что делать дальше.</p><button className="onboarding-primary" type="button" onClick={onStart}>Загрузить файл для анализа <ChevronRight aria-hidden="true" /></button></div>
      <div className="landing-preview" aria-label="Пример аналитики"><div className="preview-topline"><span>Денежный поток за 6 месяцев</span><span className="preview-status">Анализ готов</span></div><div className="preview-total"><small>10 категорий</small><strong>+2 348 076 ₽</strong></div><div className="preview-bars"><i style={{ height: '42%' }} /><i style={{ height: '58%' }} /><i style={{ height: '51%' }} /><i style={{ height: '73%' }} /><i style={{ height: '68%' }} /><i style={{ height: '88%' }} /></div><div className="preview-insight"><span>Риск</span><strong>Маркетинг и реклама</strong><small>Расходы выросли на 50% за период</small></div></div>
    </main>
    <div className="landing-benefits"><span><b>01</b> Создайте аккаунт</span><span><b>02</b> Загрузите файл</span><span><b>03</b> Автоматически категоризируем операции</span><span><b>04</b> Предложим вручную проверить то, что не удалось определить</span><span><b>05</b> Всё готово. Пользуйтесь умными инсайтами по вашим категориям</span></div>
  </div>;
}

function AccountPage({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [email, setEmail] = useState(() => window.localStorage.getItem('dds-draft-email') ?? readStored<{ email?: string } | null>('dds-account', null)?.email ?? '');
  const [password, setPassword] = useState('');
  const canContinue = email.includes('@') && password.length >= 4;
  return <div className="onboarding-page account-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><ProductMark /><OnboardingStep current={1} total={7} /></header><main className="account-content"><span className="eyebrow">Регистрация</span><h1>Создайте аккаунт</h1><p>Сохраним выписку, категории и прогресс анализа, чтобы вы могли вернуться к ним позже.</p><form onSubmit={event => { event.preventDefault(); if (canContinue) { window.localStorage.setItem('dds-account', JSON.stringify({ email })); window.localStorage.removeItem('dds-draft-email'); onContinue(); } }}><label><span>Email</span><input type="email" value={email} onChange={event => { setEmail(event.target.value); window.localStorage.setItem('dds-draft-email', event.target.value); }} placeholder="you@company.ru" autoComplete="email" /></label><label><span>Пароль</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Не менее 4 символов" autoComplete="new-password" /></label><button className="onboarding-primary" type="submit" disabled={!canContinue}>Продолжить <ChevronRight aria-hidden="true" /></button></form><small className="account-note">Продолжая, вы соглашаетесь на сохранение данных для бета-тестирования.</small></main></div>;
}

function UploadPage({ onBack, onContinue }: { onBack: () => void; onContinue: (file: File) => void }) {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [recentFiles, setRecentFiles] = useState<{ name: string; size: number; uploadedAt: string }[]>(() => readStored('dds-recent-files', []));
  const handleFile = (file?: File) => {
    if (!file) return;
    const valid = /\.(csv|xlsx|xls)$/i.test(file.name);
    setError(valid ? '' : 'Загрузите файл в формате Excel или CSV');
    setFileName(valid ? file.name : '');
    setSelectedFile(valid ? file : null);
    if (valid) {
      setRecentFiles(current => {
        const next = [{ name: file.name, size: file.size, uploadedAt: new Date().toISOString() }, ...current.filter(item => item.name !== file.name)].slice(0, 5);
        window.localStorage.setItem('dds-recent-files', JSON.stringify(next));
        return next;
      });
    }
  };
  const selectRecentFile = (item: { name: string; size: number }) => { const file = new File([''], item.name, { type: item.name.endsWith('.csv') ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); setFileName(item.name); setSelectedFile(file); setError(''); };
  return <div className="onboarding-page upload-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><ProductMark /><OnboardingStep current={2} total={7} /></header><main className="upload-content"><span className="eyebrow">Ваша выписка</span><h1>Загрузите операции</h1><p>Подойдут Excel или CSV. В файле нужны дата, сумма, назначение платежа и контрагент.</p><label className={`upload-dropzone ${error ? 'has-error' : ''}`}><input type="file" accept=".csv,.xlsx,.xls" onChange={event => handleFile(event.target.files?.[0])} /><span className="upload-plus">+</span><strong>{fileName || 'Выберите файл'}</strong><small>{fileName ? 'Файл готов к обработке' : 'или перетащите его сюда'}</small></label>{error && <p className="upload-error">{error}</p>}<div className="upload-actions"><button className="template-link" type="button" onClick={() => { const blob = new Blob(['date,amount,description,counterparty\n2026-01-15,125000,Оплата от клиента,ООО Альфа\n2026-01-16,-45000,Аренда помещения,ООО Бета'], { type: 'text/csv;charset=utf-8' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'dds-template.csv'; link.click(); URL.revokeObjectURL(url); }}>Скачать шаблон</button><button className="onboarding-primary" type="button" disabled={!selectedFile} onClick={() => selectedFile && onContinue(selectedFile)}>Продолжить <ChevronRight aria-hidden="true" /></button></div>{recentFiles.length > 0 && <section className="recent-files" aria-labelledby="recent-files-title"><div className="recent-files-heading"><h2 id="recent-files-title">Ранее загруженные файлы</h2><span>{recentFiles.length}</span></div><div className="recent-files-list">{recentFiles.map(item => <button className={`recent-file ${item.name === fileName ? 'is-selected' : ''}`} type="button" key={`${item.name}-${item.uploadedAt}`} onClick={() => selectRecentFile(item)}><span className="recent-file-icon">XLS</span><span className="recent-file-copy"><strong>{item.name}</strong><small>{item.size ? `${Math.max(1, Math.round(item.size / 1024))} КБ` : 'Файл сохранён ранее'} · {new Date(item.uploadedAt).toLocaleDateString('ru-RU')}</small></span><ChevronRight aria-hidden="true" /></button>)}</div></section>}</main></div>;
}

function BusinessContextPage({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [business, setBusiness] = useState('');
  const [customBusiness, setCustomBusiness] = useState('');
  const [otherBanks, setOtherBanks] = useState('Нет');
  const [otherEntities, setOtherEntities] = useState('Нет');
  const canContinue = business !== 'Другое' ? Boolean(business) : Boolean(customBusiness.trim());
  const businessOptions = ['IT-бизнес', 'Digital-агентство', 'Управление недвижимостью', 'Производство', 'Строительство и проектирование', 'Консалтинг', 'Образование', 'Медицина', 'Организация мероприятий', 'Рестораны, доставка еды', 'Оптовые продажи', 'Розничные продажи', 'НКО', 'Другое', 'Пока нет бизнеса'];
  return <div className="onboarding-page context-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-step">Шаг 3 из 7</span></header><main className="context-content"><span className="eyebrow">Настроим анализ</span><h1>Расскажите немного о бизнесе</h1><p>Ответы помогут точнее предложить направления и категории. Это займёт меньше минуты.</p><form onSubmit={event => { event.preventDefault(); if (canContinue) onContinue(); }}><fieldset className="business-fieldset"><legend>Чем занимается ваша компания?</legend><div className="business-chip-list">{businessOptions.map(option => <button className={business === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setBusiness(option)}>{option}</button>)}</div>{business === 'Другое' && <input className="custom-business-input" value={customBusiness} onChange={event => setCustomBusiness(event.target.value)} placeholder="Напишите, чем занимается бизнес" autoFocus />}</fieldset><fieldset><legend>Есть счета в других банках?</legend><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherBanks === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherBanks(option)}>{option}</button>)}</div></fieldset><fieldset><legend>Есть другие юридические лица?</legend><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherEntities === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherEntities(option)}>{option}</button>)}</div></fieldset><button className="onboarding-primary" type="submit" disabled={!canContinue}>Начать обработку <ChevronRight aria-hidden="true" /></button></form></main></div>;
}

type ReviewItem = { id: string; date: string; amount: number; description: string; counterparty: string; suggestedCategory: string; status: 'pending' | 'confirmed' | 'skipped'; category: string };
type ImportStats = { total: number; auto: number; review: number; unresolved: number; period: string; fileName: string; reviewItems: ReviewItem[] };

function ImportingPage({ file, onComplete }: { file: File; onComplete: (stats: ImportStats) => void }) {
  useEffect(() => { let cancelled = false; const processFile = async () => { let total = 1248; let reviewItems: ReviewItem[] = financeRows.slice(0, 5).map((row, index) => ({ id: `preview-${row.id}`, date: `2026-0${index + 1}-15`, amount: row.data.jan, description: row.description, counterparty: 'Контрагент не определён', suggestedCategory: row.name, status: 'pending', category: row.name })); if (file.name.toLowerCase().endsWith('.csv')) { try { const text = await file.text(); const lines = text.trim().split(/\r?\n/).filter(Boolean); total = Math.max(0, lines.length - 1) || total; const parsed = lines.slice(1, 7).map((line, index) => { const [date = '', amount = '0', description = '', counterparty = ''] = line.split(','); const value = Number(amount.replace(/\s/g, '').replace(',', '.')) || 0; return { id: `import-${index}`, date, amount: value, description: description || 'Без назначения', counterparty: counterparty || 'Контрагент не указан', suggestedCategory: value >= 0 ? 'Выручка от продаж' : 'Прочие операционные расходы', status: 'pending' as const, category: value >= 0 ? 'Выручка от продаж' : 'Прочие операционные расходы' }; }); if (parsed.length) reviewItems = parsed; } catch { /* use preview fallback */ } } if (!cancelled) { const review = Math.max(1, Math.round(total * .17)); const sourceItems = reviewItems; reviewItems = Array.from({ length: review }, (_, index) => ({ ...sourceItems[index % sourceItems.length], id: `review-${index}-${sourceItems[index % sourceItems.length].id}` })); onComplete({ total, auto: total - review, review, unresolved: Math.round(total * .08), period: 'Январь — Июнь 2026', fileName: file.name, reviewItems }); } }; const timer = window.setTimeout(processFile, 850); return () => { cancelled = true; window.clearTimeout(timer); }; }, [file, onComplete]);
  return <div className="onboarding-page processing-page"><header className="onboarding-header"><span /><ProductMark /><span className="onboarding-step">Шаг 4 из 7</span></header><main className="processing-content"><div className="processing-spinner" aria-hidden="true" /><span className="eyebrow">Импорт</span><h1>Анализируем выписку</h1><p>Находим операции, распределяем их по потокам и проверяем уровень уверенности.</p><div className="processing-progress"><i /></div><small>Это займёт несколько секунд</small></main></div>;
}

function ImportSummaryPage({ stats, onBack, onContinue }: { stats: ImportStats; onBack: () => void; onContinue: () => void }) {
  return <div className="onboarding-page summary-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack} aria-label="Назад"><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-step">Импорт завершён</span></header><main className="summary-content"><span className="eyebrow">Предварительный результат</span><h1>Данные готовы к анализу</h1><p>{stats.fileName} · {stats.period}</p><div className="summary-grid"><div><strong>{stats.total.toLocaleString('ru-RU')}</strong><span>Всего операций</span></div><div className="summary-positive"><strong>{stats.auto.toLocaleString('ru-RU')}</strong><span>Распределено автоматически</span></div><div className="summary-attention"><strong>{stats.review.toLocaleString('ru-RU')}</strong><span>Требуют проверки</span></div><div><strong>{stats.unresolved.toLocaleString('ru-RU')}</strong><span>Пока не определены</span></div></div><button className="onboarding-primary" type="button" onClick={onContinue}>Продолжить <ChevronRight aria-hidden="true" /></button></main></div>;
}

function ReviewOperationsTable({ items, onChange }: { items: ReviewItem[]; onChange: (id: string, category: string) => void }) {
  return <div className="review-table">{items.map(item => <Table className={`review-table-row ${item.status !== 'pending' ? 'is-reviewed' : ''}`} gridTemplateColumns="minmax(0, 1fr) 112px auto 220px" key={item.id}>
    <TableCell title={item.description} titleStyle="500" />
    <TableCell title={item.date} className="review-date-cell" />
    <TableCell title={formatCurrency(item.amount)} titleStyle="500" className={item.amount < 0 ? 'review-amount-cell negative' : 'review-amount-cell'} />
    <TableCell title={item.category} titleStyle="400" className="review-category-cell" hasRightAccessory rightAccessory={<div className="review-category-accessory"><ChevronDown aria-hidden="true" /><div className="review-category-overlay"><CategoryDropdown value={item.category} placeholder="Выберите категорию" onChange={category => onChange(item.id, category)} disabled={item.status !== 'pending'} /></div></div>} />
  </Table>)}</div>;
}

function TransactionReviewPage({ stats, onBack, onComplete }: { stats: ImportStats; onBack: () => void; onComplete: () => void }) {
  const [items, setItems] = useState(() => Array.from({ length: Math.max(stats.review, stats.reviewItems.length) }, (_, index) => ({ ...stats.reviewItems[index % stats.reviewItems.length], id: `review-${index}-${stats.reviewItems[index % stats.reviewItems.length].id}` })));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewTable, setShowReviewTable] = useState(false);
  const pending = items.filter(item => item.status === 'pending');
  const current = pending[currentIndex] ?? null;
  const updateCurrent = (status: ReviewItem['status'], category = current?.category) => { if (!current) return; setItems(value => value.map(item => item.id === current.id ? { ...item, status, category: category ?? item.category } : item)); setCurrentIndex(index => Math.min(index, Math.max(0, pending.length - 2))); };
  const updateItemCategory = (id: string, category: string) => setItems(value => value.map(item => item.id === id ? { ...item, category } : item));
  return <div className="onboarding-page review-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-step">Проверка операций</span></header><main className="review-content"><span className="eyebrow">Проверка распределения</span><h1>Помогите уточнить данные</h1><p>Мы автоматически распределили большую часть операций. Проверьте те, где уверенность ниже.</p>{current && <div className="review-card-carousel"><button className="review-card-nav" type="button" aria-label="Предыдущая операция" disabled={currentIndex === 0} onClick={() => setCurrentIndex(index => Math.max(0, index - 1))}><ChevronLeft aria-hidden="true" /></button><section key={current.id} className="review-card"><div className="review-card-top"><span>Операция {currentIndex + 1} из {pending.length}</span><span className="confidence-badge">Нужна проверка</span></div><strong className={`review-amount ${current.amount < 0 ? 'negative' : ''}`}>{formatCurrency(current.amount)}</strong><div className="review-detail-grid"><div><span>Назначение</span><strong>{current.description}</strong></div><div><span>Дата и время</span><strong>{current.date} · 10:30</strong></div><div><span>Контрагент</span><strong>{current.counterparty}</strong></div><div><span>Текущая категория</span><strong>{current.category}</strong></div></div><div className="review-select"><CategoryDropdown value={current.category} placeholder="Выберите категорию" onChange={value => updateCurrent('pending', value)} /></div><div className="review-actions"><button type="button" onClick={() => updateCurrent('skipped')}>Пропустить</button><button type="button" className="review-confirm" onClick={() => updateCurrent('confirmed')}>Подтвердить</button></div></section><button className="review-card-nav" type="button" aria-label="Следующая операция" disabled={currentIndex >= pending.length - 1} onClick={() => setCurrentIndex(index => Math.min(pending.length - 1, index + 1))}><ChevronRight aria-hidden="true" /></button></div>}{!current && <div className="review-done"><strong>Спорные операции закончились</strong><span>Все спорные операции обработаны. Можно перейти в сервис.</span></div>}<section className={`review-table-section ${showReviewTable ? '' : 'is-collapsed'}`}><div className="review-table-header"><h2>Все спорные операции</h2>{pending.length > 0 && <span>{pending.length}</span>}<button className="review-table-toggle" type="button" aria-label={showReviewTable ? 'Свернуть список операций' : 'Развернуть список операций'} aria-expanded={showReviewTable} onClick={() => setShowReviewTable(value => !value)}><ChevronUp aria-hidden="true" /></button></div><ReviewProgress pending={pending.length} processed={items.filter(item => item.status !== 'pending').length} />{showReviewTable && <ReviewOperationsTable items={items} onChange={updateItemCategory} />}</section><div className="review-footer"><button className="template-link" type="button" onClick={onComplete}>Пропустить проверку</button><button className="onboarding-primary" type="button" onClick={onComplete}>Перейти в сервис <ChevronRight aria-hidden="true" /></button></div></main></div>;
}

function CategorySetupPage({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [categories, setCategories] = useState(() => financeRows.map(row => ({ id: row.id, name: row.name, flow: row.total >= 0 ? 'Поступления' : 'Списания', count: Object.values(row.data).filter(value => value !== 0).length })));
  const [newCategory, setNewCategory] = useState('');
  const [activeAddFlow, setActiveAddFlow] = useState<'Поступления' | 'Списания' | null>(null);
  const addCategory = (flow: 'Поступления' | 'Списания') => { const name = newCategory.trim(); if (!name) return; setCategories(items => [...items, { id: `custom-${Date.now()}`, name, flow, count: 0 }]); setNewCategory(''); setActiveAddFlow(null); };
  const renderFlow = (flow: 'Поступления' | 'Списания') => <section className="setup-flow"><div className="setup-flow-heading"><div><h2>{flow}</h2><p>{categories.filter(item => item.flow === flow).length} категорий</p></div><span>{categories.filter(item => item.flow === flow).reduce((sum, item) => sum + item.count, 0)} операций</span></div><div className="setup-category-list">{categories.filter(item => item.flow === flow).map(item => <div className="setup-category-item" key={item.id}><span className="setup-category-icon">{flow === 'Поступления' ? '+' : '−'}</span><strong>{item.name}</strong><small>{item.count ? `${item.count} операций` : 'Новая категория'}</small><button type="button" aria-label={`Скрыть категорию ${item.name}`} onClick={() => setCategories(items => items.filter(category => category.id !== item.id))}>×</button></div>)}</div>{activeAddFlow === flow ? <div className="setup-add"><input autoFocus value={newCategory} onChange={event => setNewCategory(event.target.value)} placeholder={`Добавить категорию в ${flow.toLowerCase()}`} onKeyDown={event => { if (event.key === 'Enter') addCategory(flow); }} /><button type="button" onClick={() => addCategory(flow)}>Добавить</button><button className="setup-add-cancel" type="button" onClick={() => { setNewCategory(''); setActiveAddFlow(null); }}>Отмена</button></div> : <button className="setup-add-trigger" type="button" onClick={() => { setActiveAddFlow(flow); setNewCategory(''); }}><Plus aria-hidden="true" />Добавить категорию</button>}</section>;
  return <div className="onboarding-page setup-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-step">Шаг 6 из 7</span></header><main className="setup-content"><span className="eyebrow">Настройка структуры</span><h1>Проверьте категории</h1><p>Мы собрали универсальную структуру потоков. Подтвердите её или добавьте свои категории.</p>{renderFlow('Поступления')}{renderFlow('Списания')}<button className="onboarding-primary" type="button" onClick={onContinue}>Продолжить <ChevronRight aria-hidden="true" /></button></main></div>;
}

function BetaSurvey({ onClose, onSubmit }: { onClose: () => void; onSubmit: (answer: { understood: string; score: number; comment: string }) => void }) {
  const [answer, setAnswer] = useState<'yes' | 'partly' | 'no' | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);
  const canSubmit = answer !== null && score !== null;
  return <div className="beta-survey-backdrop"><section className="beta-survey" aria-label="Обратная связь"><button className="beta-survey-close" type="button" onClick={onClose} aria-label="Закрыть"><X /></button>{sent ? <div className="beta-survey-success"><span>✓</span><h2>Спасибо за обратную связь</h2><p>Ваш ответ поможет сделать сервис полезнее.</p><button className="onboarding-primary" type="button" onClick={onClose}>Вернуться в сервис</button></div> : <><span className="eyebrow">Бета-тест</span><h2>Удалось понять, куда обратить внимание?</h2><div className="survey-choice-row">{[['yes', 'Да'], ['partly', 'Частично'], ['no', 'Нет']].map(([value, label]) => <button type="button" className={answer === value ? 'is-selected' : ''} key={value} onClick={() => setAnswer(value as 'yes' | 'partly' | 'no')}>{label}</button>)}</div><h3>Насколько полезны инсайты?</h3><div className="survey-score-row">{[1, 2, 3, 4, 5].map(value => <button type="button" className={score === value ? 'is-selected' : ''} key={value} onClick={() => setScore(value)}>{value}</button>)}</div><textarea value={comment} onChange={event => setComment(event.target.value)} placeholder="Что помешало разобраться? (необязательно)" /><button className="onboarding-primary" type="button" disabled={!canSubmit} onClick={() => { if (answer && score) { onSubmit({ understood: answer, score, comment }); setSent(true); } }}>Отправить отзыв</button></>}</section></div>;
}

function InsightsDrawer({ onClose, onSelect, insights }: { onClose: () => void; onSelect: (insight: AIInsight) => void; insights: AIInsight[] }) {
  const [filter, setFilter] = useState<'Все' | 'Риски' | 'Рекомендации'>('Все');
  const filtered = insights.filter(insight => filter === 'Все' || (filter === 'Рекомендации' ? insight.severity === 'opportunity' : insight.severity !== 'opportunity'));
  const groups = [{ title: 'Сегодня, 2 апреля', items: filtered.slice(0, 3) }, { title: 'Вчера, 1 апреля', items: filtered.slice(3) }].filter(group => group.items.length);
  return <>
    <div className="insights-drawer-backdrop" onClick={onClose} />
    <aside className="insights-drawer" aria-label="Все инсайты">
      <header className="insights-drawer-header"><h2>Инсайты</h2><button type="button" aria-label="Закрыть" onClick={onClose}><X /></button></header>
      <div className="insights-drawer-content">
        <div className="insights-drawer-filters">{(['Все', 'Риски', 'Рекомендации'] as const).map(item => <button key={item} type="button" className={filter === item ? 'is-selected' : ''} onClick={() => setFilter(item)}>{item}{item === 'Все' && <span>{insights.length}</span>}</button>)}</div>
        {groups.map(group => <section className="insights-drawer-group" key={group.title}><h3>{group.title}</h3><div className="insights-drawer-list">{group.items.map((insight, index) => { const presentation = insightPresentation[(index + (group.title.startsWith('Вчера') ? 1 : 0)) % insightPresentation.length]; return <button className="insights-drawer-card" type="button" key={insight.id} onClick={() => onSelect(insight)}><span className={`insight-tag ${insight.severity === 'opportunity' ? 'is-purple' : ''}`}>{insight.severity === 'opportunity' ? 'Рекомендация' : 'Риск'}</span><strong>{presentation.title}</strong><span className="insight-card-description">{presentation.description}</span><span className="insight-card-footer"><span>Подробнее</span><span>19 мая, 20:00</span></span>{insight.severity !== 'opportunity' && <span className="insight-dot" aria-hidden="true" />}</button>; })}</div></section>)}
        <div className="insights-drawer-empty"><span />Это — конец списка.<br />Других инсайтов не было.</div>
      </div>
    </aside>
  </>;
}

export default function App() {
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [highlightedRowIds, setHighlightedRowIds] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [insightsDrawerOpen, setInsightsDrawerOpen] = useState(false);
  const [createPage, setCreatePage] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [activityFilter, setActivityFilter] = useState('Все направления');
  const [quarterFilter, setQuarterFilter] = useState('Все кварталы');
  const [mobileDetail, setMobileDetail] = useState<{ key: typeof categories[number]['key']; mode: 'incoming' | 'outgoing' } | null>(null);
  const [activityPageKey, setActivityPageKey] = useState<typeof categories[number]['key'] | null>(null);
  const [viewMode, setViewMode] = useState<'simple' | 'table'>('table');
  const [productStage, setProductStage] = useState<ProductStage>(() => window.location.pathname === '/service' || window.localStorage.getItem('dds-stage') === 'analytics' ? 'analytics' : 'landing');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStats, setImportStats] = useState<ImportStats | null>(() => readStored<ImportStats | null>('dds-import-stats', null));
  const [analyticsRows, setAnalyticsRows] = useState<FinanceRow[]>(() => readStored<FinanceRow[]>('dds-analytics-rows', financeRows));
  const [analyticsInsights, setAnalyticsInsights] = useState<AIInsight[]>(() => readStored<AIInsight[]>('dds-analytics-insights', aiInsights));
  const [surveyOpen, setSurveyOpen] = useState(false);
  const accountEmail = readStored<{ email?: string } | null>('dds-account', null)?.email ?? 'client@example.com';
  const currentRoute: AppRoute = createPage ? 'create-article' : activityPageKey ? 'activity' : mobileDetail ? 'mobile-detail' : 'overview';
  const flowState = { ...initialDDSFlowState, route: currentRoute };
  useEffect(() => { window.localStorage.setItem('dds-stage', productStage); if (importStats) window.localStorage.setItem('dds-import-stats', JSON.stringify(importStats)); window.localStorage.setItem('dds-analytics-rows', JSON.stringify(analyticsRows)); window.localStorage.setItem('dds-analytics-insights', JSON.stringify(analyticsInsights)); }, [productStage, importStats, analyticsRows, analyticsInsights]);
  useEffect(() => { if (analyticsInsights.length < 3 || !analyticsInsights.some(insight => insight.severity === 'opportunity')) setAnalyticsInsights(buildDynamicInsights(analyticsRows)); }, [analyticsRows]);
  useEffect(() => { if (!highlightedRowIds.length) return; const timer = window.setTimeout(() => setHighlightedRowIds([]), 3000); return () => window.clearTimeout(timer); }, [highlightedRowIds]);
  const openInsight = (insight: AIInsight) => { setSelectedInsight(insight); setHighlightedRowIds(insight.relatedRowIds); setDrawerOpen(true); };
  const relatedRows = useMemo(() => selectedInsight ? analyticsRows.filter(row => selectedInsight.relatedRowIds.includes(row.id)) : [], [selectedInsight, analyticsRows]);
  const visibleCategories = categories.filter(({ key }) => activityFilter === 'Все направления' || (activityFilter === 'Операционная' && key === 'operating') || (activityFilter === 'Инвестиционная' && key === 'investment') || (activityFilter === 'Финансовая' && key === 'financial'));
  const activityOptions = ['Все направления', 'Операционная', 'Инвестиционная', 'Финансовая'];
  const quarterOptions = ['Все кварталы', '1 квартал', '2 квартал', '3 квартал', '4 квартал'];
  const cycle = (current: string, options: string[], setter: (value: string) => void) => setter(options[(options.indexOf(current) + 1) % options.length]);
  const handleRowClick = (row: FinanceRow) => { const insight = analyticsInsights.find(item => item.relatedRowIds.includes(row.id)); if (insight) openInsight(insight); };
  if (productStage === 'landing') return <LandingPage onStart={() => setProductStage('account')} />;
  if (productStage === 'account') return <AccountPage onBack={() => setProductStage('landing')} onContinue={() => setProductStage('upload')} />;
  if (productStage === 'upload') return <UploadPage onBack={() => setProductStage('account')} onContinue={file => { setImportFile(file); setProductStage('business-context'); }} />;
  if (productStage === 'business-context') return <BusinessContextPage onBack={() => setProductStage('upload')} onContinue={() => setProductStage('importing')} />;
  if (productStage === 'importing' && importFile) return <ImportingPage file={importFile} onComplete={stats => { const importedRows = buildAnalyticsRows(stats.reviewItems); setImportStats(stats); setAnalyticsRows(importedRows); setAnalyticsInsights(buildDynamicInsights(importedRows)); setProductStage('distribution-summary'); }} />;
  if (productStage === 'distribution-summary' && importStats) return <ImportSummaryPage stats={importStats} onBack={() => setProductStage('business-context')} onContinue={() => setProductStage('category-setup')} />;
  if (productStage === 'category-setup') return <CategorySetupPage onBack={() => setProductStage('distribution-summary')} onContinue={() => setProductStage('transaction-review')} />;
  if (productStage === 'transaction-review' && importStats) return <TransactionReviewPage stats={importStats} onBack={() => setProductStage('category-setup')} onComplete={() => { window.history.pushState({}, '', '/service'); setProductStage('analytics'); }} />;
  return <div className="tds-app-shell" data-product-stage={productStage} data-app-route={flowState.route}>
      <MainPageNavigationBar activeNavItem="main" customer={accountEmail} avatarInitials="" hasNewPush onNavPaymentsClick={() => setProductStage('landing')} />
    <div className="tds-workspace"><aside className="tds-sidebar"><button className="sidebar-back" type="button" aria-label="Назад" onClick={() => { if (createPage) setCreatePage(false); else if (activityPageKey) setActivityPageKey(null); else if (mobileDetail) setMobileDetail(null); }}><ArrowLeft aria-hidden="true" /></button><h2 className="sidebar-title">{createPage ? <>Новая статья<br />расходов</> : 'ДДС'}</h2></aside>
      <main className={`tds-content ${createPage ? 'create-content' : ''} ${viewMode === 'simple' ? 'simple-mode' : 'table-mode'}`}>
        {createPage ? <CreateExpensePage onBack={() => setCreatePage(false)} onSubmit={() => setCreatePage(false)} /> : activityPageKey ? <ActivityDetailPage activityTitle={categories.find(category => category.key === activityPageKey)?.title ?? ''} rows={analyticsRows.filter(row => row.category === activityPageKey)} onBack={() => setActivityPageKey(null)} /> : mobileDetail ? <MobileActivityDetail activityTitle={categories.find(category => category.key === mobileDetail.key)?.title ?? ''} mode={mobileDetail.mode} rows={analyticsRows.filter(row => row.category === mobileDetail.key)} onBack={() => setMobileDetail(null)} /> : <>
        {importStats && <div className="import-status-banner"><span><b>Источник данных:</b> {importStats.fileName}</span><button type="button" onClick={() => setProductStage('transaction-review')}>Проверить спорные</button></div>}
        <div className="filter-row" aria-label="Фильтр таблицы"><Chip className={`filter-trigger ${filtersExpanded ? 'is-selected' : ''}`} variant="action" leftAccessory="icon" leftIcon={<SlidersHorizontal />} onClick={() => setFiltersExpanded(value => !value)}>Фильтры</Chip><Chip variant="dropdown" value={activityFilter} onClick={() => cycle(activityFilter, activityOptions, setActivityFilter)}>По видам деятельности{activityFilter !== 'Все направления' ? `: ${activityFilter}` : ''}</Chip><Chip variant="dropdown" value={quarterFilter} onClick={() => cycle(quarterFilter, quarterOptions, setQuarterFilter)}>По кварталам{quarterFilter !== 'Все кварталы' ? `: ${quarterFilter}` : ''}</Chip><div className="desktop-mode-toggle"><Chip variant="tab" isSelected={viewMode === 'simple'} onClick={() => setViewMode('simple')}>Простой</Chip><Chip variant="tab" isSelected={viewMode === 'table'} onClick={() => setViewMode('table')}>Таблица</Chip></div></div>
        {filtersExpanded && <div className="filters-summary"><span>Активные фильтры</span><button type="button" onClick={() => { setActivityFilter('Все направления'); setQuarterFilter('Все кварталы'); }}>Сбросить</button></div>}
        <section className="insights-panel"><div className="insights-heading"><div><button className="insights-title-button" type="button" onClick={() => setInsightsDrawerOpen(true)}><h2>Инсайты <ChevronRight aria-hidden="true" /></h2></button><p>Анализ вашего бизнеса</p></div><Sparkles className="insights-star-icon" aria-hidden="true" /></div><div className="insight-grid">{analyticsInsights.slice(0, 3).map((insight, index) => <button className="insight-card" type="button" key={insight.id} onClick={() => openInsight(insight)}><span className={`insight-tag ${insight.severity === 'opportunity' ? 'is-purple' : ''}`}>{insight.severity === 'opportunity' ? 'Рекомендация' : 'Риск'}</span><strong>{insight.title}</strong><span className="insight-card-description">{insight.description}</span><span className="insight-card-footer"><span>Подробнее</span></span>{index === 0 && <span className="insight-dot" aria-hidden="true" />}</button>)}</div><div className="mobile-insight-dots"><b /><i /><i /><i /><i /></div></section>
        <div className="category-list">{categories.map(({ key, title, icon }) => <CashFlowTable key={key} title={title} icon={icon} rows={analyticsRows.filter(row => row.category === key)} highlightedRowIds={highlightedRowIds} onRowClick={handleRowClick} onAdd={() => setCreatePage(true)} onOpenDetail={mode => setMobileDetail({ key, mode })} onOpenActivity={() => setActivityPageKey(key)} viewMode={viewMode} insights={analyticsInsights} />)}</div>
        <FeedbackBanner className="feedback-strip" primaryAction={{ label: 'Оставить отзыв' }} secondaryAction={{ label: 'Позже' }}>Помогите нам сделать раздел удобнее</FeedbackBanner>
        </>}
      </main></div>{insightsDrawerOpen && <InsightsDrawer insights={analyticsInsights} onClose={() => setInsightsDrawerOpen(false)} onSelect={insight => { setInsightsDrawerOpen(false); openInsight(insight); }} />}<DetailsDrawerTDS isOpen={drawerOpen} insight={selectedInsight} relatedRows={relatedRows} onClose={() => setDrawerOpen(false)} onNavigateToRow={id => setHighlightedRowIds([id])} onAction={action => { setDrawerOpen(false); if (action === 'review') setProductStage('transaction-review'); else if (action === 'article') setCreatePage(true); else setSurveyOpen(true); }} />{surveyOpen && <BetaSurvey onClose={() => setSurveyOpen(false)} onSubmit={answer => window.localStorage.setItem('dds-beta-feedback', JSON.stringify({ ...answer, submittedAt: new Date().toISOString() }))} />}
  </div>;
}
