import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Cell, Checkbox, Chip, Dropdown, FeedbackBanner, MainPageNavigationBar, Search, Table, TableCell } from '../../vendor/t-ds/src';
import { ChevronDown, ChevronRight, ChevronUp, Plus } from '../../vendor/t-ds/src/assets/Icon/icons';
import { ChevronLeft } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { MoneyAcceptorArrowUp, Wallet } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { CoinsRuble } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { ArrowLeft } from '../../vendor/t-ds/src/assets/Icon/24/Stroked';
import { DetailsDrawerTDS } from './components/DetailsDrawerTDS';
import { askAssistant } from './assistantApi';
import { aiInsights, financeRows, type AIInsight, type FinanceRow, type RowCategory, formatCurrency } from './data/financeData';
import { initialDDSFlowState, type AppRoute, type ProductStage } from './state/ddsFlow';
import { Eye, EyeOff, Phone, Sparkles, X } from 'lucide-react';

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

function FilterDropdown({ label, value, placeholder, options, onChange }: { label: string; value?: string; placeholder: string; options: string[]; onChange: (value: string) => void }) {
  return <div className="filter-dropdown"><Dropdown label={label} value={value} placeholder={placeholder}>{options.map(option => <Cell key={option} title={option} onClick={() => onChange(option)} />)}</Dropdown></div>;
}

function ReviewProgress({ pending, processed }: { pending: number; processed: number }) {
  const total = pending + processed;
  const progress = total ? Math.max(processed ? 1 : 0, Math.round((processed / total) * 100)) : 100;
  return <div className="review-progress" aria-label={`Обработано ${processed} из ${total} операций`}>
    <div className="review-progress-label"><span><b>{processed}</b> обработано</span><span><b>{pending}</b> осталось</span><strong>{progress}%</strong></div>
    <div className="review-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={processed}><span style={{ width: `${progress}%` }} /></div>
  </div>;
}

function OnboardingStep({ current, total }: { current: number; total: number }) {
  return <span className="onboarding-step" aria-label={`Шаг ${current} из ${total}`}>Шаг {current} из {total}</span>;
}

function OnboardingHeader({ onBack, step, sectionLabel = 'Регистрация', backLabel = 'Назад' }: { onBack?: () => void; step?: number; sectionLabel?: string; backLabel?: string }) {
  return <AppHeader onBack={onBack} step={step} sectionLabel={sectionLabel} className="account-header" />;
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

function AppHeader({ onBack, step, sectionLabel = '', className = '', customer }: { onBack?: () => void; step?: number; sectionLabel?: string; className?: string; customer?: string }) {
  return <>
    <MainPageNavigationBar className={`shared-onboarding-header ${className}`.trim()} activeNavItem="main" hasNewPush={false} customer={customer ?? readStored<{ email?: string } | null>('dds-account', null)?.email ?? 'vindmorov@yandex.ru'} />
    <div className="shared-onboarding-tools">
      {onBack && <button className="onboarding-back" type="button" onClick={onBack} aria-label="Назад"><ArrowLeft aria-hidden="true" /></button>}
      {sectionLabel && <span className="onboarding-section-label">{sectionLabel}</span>}
      {step && <OnboardingStep current={step} total={7} />}
    </div>
  </>;
}

function readStored<T>(key: string, fallback: T): T {
  try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return <div className="onboarding-page landing-page">
    <MainPageNavigationBar className="shared-onboarding-header landing-shared-header" activeNavItem="main" hasNewPush={false} onNavPaymentsClick={onStart} />
    <main className="landing-content">
      <div className="landing-copy"><h1>Поймите, куда уходят деньги вашего бизнеса</h1><p>Загрузите выписку — а мы покажем динамику по категориям, найдём зоны внимания и подскажем, что делать дальше</p><button className="onboarding-primary" type="button" onClick={onStart}>Попробовать</button></div>
      <div className="landing-preview" aria-label="Пример аналитики"><div className="preview-topline"><span>Денежный поток за 6 месяцев</span><span className="preview-status">Анализ готов</span></div><div className="preview-total"><small>10 категорий</small><strong>+2 348 076 ₽</strong></div><div className="preview-bars"><i style={{ height: '42%' }} /><i style={{ height: '58%' }} /><i style={{ height: '51%' }} /><i style={{ height: '73%' }} /><i style={{ height: '68%' }} /><i style={{ height: '88%' }} /></div><div className="preview-insight"><span>Риск</span><strong>Маркетинг и реклама</strong><small>Расходы выросли на 50% за период</small></div></div>
    </main>
    <div className="landing-benefits"><span><b>01</b> Создайте аккаунт</span><span><b>02</b> Загрузите файл</span><span><b>03</b> Автоматически категоризируем операции</span><span><b>04</b> Предложим вручную проверить то, что не удалось определить</span><span><b>05</b> Всё готово. Пользуйтесь умными инсайтами по вашим категориям</span></div>
  </div>;
}

function AccountPage({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [email, setEmail] = useState(() => window.localStorage.getItem('dds-draft-email') ?? readStored<{ email?: string } | null>('dds-account', null)?.email ?? '');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [consent, setConsent] = useState(false);
  const canContinue = email.trim().length > 0 && password.length >= 4 && consent;
  return <div className="onboarding-page account-page"><OnboardingHeader /><main className="account-content"><p>Сохраним выписку, категории и прогресс анализа, чтобы вы могли вернуться к ним позже.</p><form id="account-form" className="account-form account-form--figma" onSubmit={event => { event.preventDefault(); if (canContinue) { window.localStorage.setItem('dds-account', JSON.stringify({ email })); window.localStorage.removeItem('dds-draft-email'); onContinue(); } }}><label className="account-form-field form-cell"><span>Логин</span><input type="text" value={email} onChange={event => { setEmail(event.target.value); window.localStorage.setItem('dds-draft-email', event.target.value); }} placeholder="+7 (922) 164-00-51, testmail@mail.ru" autoComplete="username" /><small>В качестве логина можно использовать почту или телефон, которые вы указали при регистрации</small></label><label className="account-form-field account-password-field form-cell"><span>Пароль</span><input type={passwordVisible ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="Придумайте пароль" autoComplete="new-password" /><button className="account-password-toggle" type="button" aria-label={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'} onClick={() => setPasswordVisible(value => !value)}>{passwordVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</button></label><label className="account-consent form-cell"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>Я согласен на <a href="#personal-data">обработку персональных данных</a> и с <a href="#offer">офертой предоставления услуг АО «Точка»</a></span></label></form><footer className="account-footer"><button className="account-back-button" type="button" onClick={onBack}>Назад</button><button className="onboarding-primary" form="account-form" type="submit" disabled={!canContinue}>Продолжить</button></footer></main></div>;
}

function FigmaChatHeader({ step }: { step?: number }) {
  return <header className="figma-chat-header"><div className="figma-chat-brand"><ProductMark /><span className="figma-chat-assistant"><b>А</b>ИИ-Ассистент</span></div>{step && <span className="figma-chat-step">Шаг {step} из 7</span>}</header>;
}

function downloadStatementTemplate() {
  const blob = new Blob(['date,amount,description,counterparty\n2026-01-15,125000,Оплата от клиента,ООО Альфа\n2026-01-16,-45000,Аренда помещения,ООО Бета'], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dds-template.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function FigmaUploadPage({ onBack, onContinue }: { onBack: () => void; onContinue: (file: File, context?: string) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('');
  const [assistantTurns, setAssistantTurns] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [assistantPending, setAssistantPending] = useState(false);
  const [contextStarted, setContextStarted] = useState(false);
  const [analysisStage, setAnalysisStage] = useState<'upload' | 'processing' | 'summary'>('upload');
  const [business, setBusiness] = useState('');
  const [customBusiness, setCustomBusiness] = useState('');
  const [otherBanks, setOtherBanks] = useState('Нет');
  const [otherEntities, setOtherEntities] = useState('Нет');
  const businessOptions = ['IT-бизнес', 'Digital-агентство', 'Управление недвижимостью', 'Производство', 'Строительство и проектирование', 'Консалтинг', 'Образование', 'Медицина', 'Организация мероприятий', 'Рестораны, доставка еды', 'Оптовые продажи', 'Розничные продажи', 'НКО', 'Другое', 'Пока нет бизнеса'];
  const canContinueContext = business !== 'Другое' ? Boolean(business) : Boolean(customBusiness.trim());
  useEffect(() => {
    if (analysisStage !== 'processing') return;
    const timer = window.setTimeout(() => setAnalysisStage('summary'), 850);
    return () => window.clearTimeout(timer);
  }, [analysisStage]);
  const handleFile = (file?: File) => { if (!file) return; if (!/\.(csv|xlsx|xls)$/i.test(file.name)) { setError('Загрузите файл в формате Excel или CSV'); return; } setError(''); setSelectedFile(file); };
  const sendAssistantMessage = async () => {
    const message = assistantMessage.trim();
    if (!message || assistantPending) return;
    setAssistantMessage('');
    setAssistantTurns(turns => [...turns, { role: 'user', text: message }]);
    setAssistantPending(true);
    try {
      const answer = await askAssistant(message);
      setAssistantTurns(turns => [...turns, { role: 'assistant', text: answer }]);
    } catch (requestError) {
      setAssistantTurns(turns => [...turns, { role: 'assistant', text: requestError instanceof Error ? requestError.message : 'Не удалось получить ответ. Попробуйте ещё раз.' }]);
    } finally {
      setAssistantPending(false);
    }
  };
  return <div className={`onboarding-page figma-upload-page ${contextStarted ? 'context-chat-page' : ''}`}><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack} aria-label="Назад"><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-section-label">Загрузка</span><span className="onboarding-step">Шаг 2 из 7</span><button className="onboarding-support" type="button" aria-label="Позвонить в поддержку"><Phone aria-hidden="true" /></button></header><main className="figma-upload-main"><div className="figma-upload-thread"><div className="figma-ai-message"><span className="figma-ai-avatar">А</span><div><strong>Ассистент</strong><p>Загрузите файл. Подойдут Excel или CSV. В файле нужны дата, сумма, назначение платежа и контрагент. <button className="assistant-template-link" type="button" onClick={downloadStatementTemplate}>Скачать шаблон выписки</button></p></div></div><label className="figma-upload-dropzone"><input type="file" accept=".csv,.xlsx,.xls" onChange={event => handleFile(event.target.files?.[0])} /><strong>{selectedFile ? selectedFile.name : 'Выберите файл'}</strong><small>{selectedFile ? 'Файл выбран и готов к отправке' : 'или перетащите его сюда'}</small></label>{error && <p className="upload-error">{error}</p>}{selectedFile && <div className="figma-upload-file"><span>{selectedFile.name}</span><button type="button" aria-label="Удалить файл" onClick={() => { setSelectedFile(null); setContextStarted(false); setBusiness(''); setCustomBusiness(''); setOtherBanks('Нет'); setOtherEntities('Нет'); }}><X aria-hidden="true" /></button></div>}{contextStarted && <><div className="figma-ai-message context-followup-message"><img className="figma-ai-avatar-image" src="/Content.svg" alt="ИИ-Ассистент" /><div><strong>Ассистент</strong><p>Ответы помогут точнее предложить направления и категории.</p></div></div><section className="context-chat-question context-chat-question--combined"><div className="context-chat-question-item"><span>Чем занимается ваша компания?</span><div className="business-chip-list">{businessOptions.map(option => <button className={business === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setBusiness(option)}>{option}</button>)}</div>{business === 'Другое' && <input className="custom-business-input" value={customBusiness} onChange={event => setCustomBusiness(event.target.value)} placeholder="Напишите, чем занимается бизнес" autoFocus />}</div><div className="context-chat-question-item"><span>Есть счета в других банках?</span><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherBanks === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherBanks(option)}>{option}</button>)}</div></div><div className="context-chat-question-item"><span>Есть другие юридические лица?</span><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherEntities === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherEntities(option)}>{option}</button>)}</div></div></section></>}{analysisStage === 'summary' && <><div className="figma-ai-message embedded-analysis-message"><img className="figma-ai-avatar-image" src="/Content.svg" alt="ИИ-Ассистент" /><div><strong>Ассистент</strong><p>Данные готовы к анализу. Я обработал выписку и подготовил операции.</p></div></div><section className="summary-chat-card embedded-summary-card"><div><strong>1 248</strong><span>Всего операций</span></div><div className="summary-positive"><strong>1 036</strong><span>Распределено автоматически</span></div><div className="summary-attention"><strong>212</strong><span>Требуют проверки</span></div><div><strong>100</strong><span>Пока не определены</span></div></section></>}{assistantTurns.map((turn, index) => turn.role === 'user' ? <div className="assistant-user-message" key={`${turn.role}-${index}`}>{turn.text}</div> : <div className="figma-ai-message assistant-reply" key={`${turn.role}-${index}`}><span className="figma-ai-avatar">А</span><div><strong>ИИ-Ассистент</strong><p>{turn.text}</p></div></div>)}{assistantPending && <div className="figma-ai-message assistant-reply is-pending"><span className="figma-ai-avatar">А</span><div><strong>ИИ-Ассистент</strong><p>Думаю над ответом…</p></div></div>}{analysisStage !== 'processing' && <div className="upload-chat-actions upload-main-actions"><button type="button" onClick={contextStarted ? () => setContextStarted(false) : onBack}>Назад</button><button type="button" disabled={!selectedFile || (contextStarted && !canContinueContext)} onClick={() => { if (!selectedFile) return; if (!contextStarted) { setContextStarted(true); return; } if (analysisStage === 'upload') { setAnalysisStage('summary'); return; } onContinue(selectedFile, `${business === 'Другое' ? customBusiness.trim() : business}; Счета в других банках: ${otherBanks}; Другие юридические лица: ${otherEntities}`); }}>Продолжить</button></div>}</div><div className="figma-upload-composer"><label className="assistant-composer-attach" aria-label="Выбрать файл"><Plus aria-hidden="true" /><input type="file" accept=".csv,.xlsx,.xls" onChange={event => handleFile(event.target.files?.[0])} /></label><label className="assistant-composer-input"><input type="text" value={assistantMessage} onChange={event => setAssistantMessage(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') sendAssistantMessage(); }} placeholder="Спросить ИИ-Ассистента" aria-label="Сообщение для ИИ-Ассистента" /></label><button className={assistantMessage.trim() ? 'is-ready' : ''} type="button" disabled={!assistantMessage.trim() || assistantPending} onClick={sendAssistantMessage} aria-label="Отправить сообщение"><ChevronRight aria-hidden="true" /></button></div></main></div>;
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

function LegacyBusinessContextPage({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [business, setBusiness] = useState('');
  const [customBusiness, setCustomBusiness] = useState('');
  const [otherBanks, setOtherBanks] = useState('Нет');
  const [otherEntities, setOtherEntities] = useState('Нет');
  const canContinue = business !== 'Другое' ? Boolean(business) : Boolean(customBusiness.trim());
  const businessOptions = ['IT-бизнес', 'Digital-агентство', 'Управление недвижимостью', 'Производство', 'Строительство и проектирование', 'Консалтинг', 'Образование', 'Медицина', 'Организация мероприятий', 'Рестораны, доставка еды', 'Оптовые продажи', 'Розничные продажи', 'НКО', 'Другое', 'Пока нет бизнеса'];
  return <div className="onboarding-page context-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-step">Шаг 3 из 7</span></header><main className="context-content"><span className="eyebrow">Настроим анализ</span><h1>Расскажите немного о бизнесе</h1><p>Ответы помогут точнее предложить направления и категории. Это займёт меньше минуты.</p><form onSubmit={event => { event.preventDefault(); if (canContinue) onContinue(); }}><fieldset className="business-fieldset"><legend>Чем занимается ваша компания?</legend><div className="business-chip-list">{businessOptions.map(option => <button className={business === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setBusiness(option)}>{option}</button>)}</div>{business === 'Другое' && <input className="custom-business-input" value={customBusiness} onChange={event => setCustomBusiness(event.target.value)} placeholder="Напишите, чем занимается бизнес" autoFocus />}</fieldset><fieldset><legend>Есть счета в других банках?</legend><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherBanks === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherBanks(option)}>{option}</button>)}</div></fieldset><fieldset><legend>Есть другие юридические лица?</legend><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherEntities === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherEntities(option)}>{option}</button>)}</div></fieldset><button className="onboarding-primary" type="submit" disabled={!canContinue}>Начать обработку <ChevronRight aria-hidden="true" /></button></form></main></div>;
}

function BusinessContextPage({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [business, setBusiness] = useState('');
  const [customBusiness, setCustomBusiness] = useState('');
  const [otherBanks, setOtherBanks] = useState('Нет');
  const [otherEntities, setOtherEntities] = useState('Нет');
  const businessOptions = ['IT-бизнес', 'Digital-агентство', 'Управление недвижимостью', 'Производство', 'Строительство и проектирование', 'Консалтинг', 'Образование', 'Медицина', 'Организация мероприятий', 'Рестораны, доставка еды', 'Оптовые продажи', 'Розничные продажи', 'НКО', 'Другое', 'Пока нет бизнеса'];
  const canContinue = business !== 'Другое' ? Boolean(business) : Boolean(customBusiness.trim());
  const answer = (value: string) => value === 'Другое' ? 'Другое' : value;
  return <div className="onboarding-page context-chat-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack} aria-label="Назад"><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-section-label">Контекст</span><span className="onboarding-step">Шаг 3 из 7</span><button className="onboarding-support" type="button" aria-label="Позвонить в поддержку"><Phone aria-hidden="true" /></button></header><main className="context-chat-main"><div className="context-chat-thread"><div className="figma-ai-message"><span className="figma-ai-avatar">А</span><div><strong>Расскажите немного о бизнесе</strong><p>Ответы помогут точнее предложить направления и категории. Это займёт меньше минуты.</p></div></div><section className="context-chat-question"><span>Чем занимается ваша компания?</span><div className="business-chip-list">{businessOptions.map(option => <button className={business === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setBusiness(option)}>{option}</button>)}</div>{business === 'Другое' && <input className="custom-business-input" value={customBusiness} onChange={event => setCustomBusiness(event.target.value)} placeholder="Напишите, чем занимается бизнес" autoFocus />}</section><section className="context-chat-question"><span>Есть счета в других банках?</span><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherBanks === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherBanks(option)}>{option}</button>)}</div></section><section className="context-chat-question"><span>Есть другие юридические лица?</span><div className="choice-row">{['Да', 'Нет'].map(option => <button className={otherEntities === option ? 'is-selected' : ''} type="button" key={option} onClick={() => setOtherEntities(option)}>{option}</button>)}</div></section>{canContinue && <div className="upload-chat-actions context-chat-actions"><button type="button" onClick={onBack}>Назад</button><button type="button" onClick={onContinue}>Продолжить</button></div>}</div><div className="figma-upload-composer context-chat-composer"><label><Plus aria-hidden="true" /><span>Спросить ИИ-Ассистента</span></label><button type="button" disabled aria-label="Продолжить"><ChevronRight aria-hidden="true" /></button></div></main></div>;
}

type ReviewItem = { id: string; date: string; amount: number; description: string; counterparty: string; suggestedCategory: string; status: 'pending' | 'confirmed' | 'skipped'; category: string };
type ImportStats = { total: number; auto: number; review: number; unresolved: number; period: string; fileName: string; reviewItems: ReviewItem[] };
const createReviewItems = (sourceItems: ReviewItem[], count: number) => Array.from({ length: Math.max(count, sourceItems.length) }, (_, index) => ({ ...sourceItems[index % sourceItems.length], id: `review-${index}-${sourceItems[index % sourceItems.length].id}`, status: 'pending' as const }));

function ImportingPage({ file, onComplete }: { file: File; onComplete: (stats: ImportStats) => void }) {
  useEffect(() => { let cancelled = false; const processFile = async () => { let total = 1248; let reviewItems: ReviewItem[] = financeRows.slice(0, 5).map((row, index) => ({ id: `preview-${row.id}`, date: `2026-0${index + 1}-15`, amount: row.data.jan, description: row.description, counterparty: 'Контрагент не определён', suggestedCategory: row.name, status: 'pending', category: row.name })); if (file.name.toLowerCase().endsWith('.csv')) { try { const text = await file.text(); const lines = text.trim().split(/\r?\n/).filter(Boolean); total = Math.max(0, lines.length - 1) || total; const parsed = lines.slice(1, 7).map((line, index) => { const [date = '', amount = '0', description = '', counterparty = ''] = line.split(','); const value = Number(amount.replace(/\s/g, '').replace(',', '.')) || 0; return { id: `import-${index}`, date, amount: value, description: description || 'Без назначения', counterparty: counterparty || 'Контрагент не указан', suggestedCategory: value >= 0 ? 'Выручка от продаж' : 'Прочие операционные расходы', status: 'pending' as const, category: value >= 0 ? 'Выручка от продаж' : 'Прочие операционные расходы' }; }); if (parsed.length) reviewItems = parsed; } catch { /* use preview fallback */ } } if (!cancelled) { const review = Math.max(1, Math.round(total * .17)); const sourceItems = reviewItems; reviewItems = Array.from({ length: review }, (_, index) => ({ ...sourceItems[index % sourceItems.length], id: `review-${index}-${sourceItems[index % sourceItems.length].id}` })); onComplete({ total, auto: total - review, review, unresolved: Math.round(total * .08), period: 'Январь — Июнь 2026', fileName: file.name, reviewItems }); } }; const timer = window.setTimeout(processFile, 850); return () => { cancelled = true; window.clearTimeout(timer); }; }, [file, onComplete]);
  return <div className="onboarding-page processing-page processing-chat-page"><header className="onboarding-header"><span /><ProductMark /><span className="onboarding-step">Шаг 4 из 7</span><button className="onboarding-support" type="button" aria-label="Позвонить в поддержку"><Phone aria-hidden="true" /></button></header><main className="processing-chat-main"><div className="processing-chat-thread"><div className="figma-ai-message"><span className="figma-ai-avatar">А</span><div><strong>Анализируем выписку</strong><p>Проверяю операции, распределяю их по потокам и готовлю данные для анализа.</p></div></div><div className="processing-file-message"><span className="processing-file-icon" aria-hidden="true" /><div><strong>{file.name}</strong><small>Файл загружен и готов к обработке</small></div></div><div className="processing-status"><span className="processing-status-dot" aria-hidden="true" /><span>Читаю выписку...</span></div></div><div className="figma-upload-composer processing-chat-composer"><label><Plus aria-hidden="true" /><span>Анализируем выписку...</span></label><button type="button" disabled aria-label="Анализ выписки выполняется"><ChevronRight aria-hidden="true" /></button></div></main></div>;
}

function ImportSummaryPage({ stats, onBack, onContinue }: { stats: ImportStats; onBack: () => void; onContinue: () => void }) {
  return <div className="onboarding-page summary-page summary-chat-page"><header className="onboarding-header"><button className="onboarding-back" type="button" onClick={onBack} aria-label="Назад"><ArrowLeft aria-hidden="true" /></button><ProductMark /><span className="onboarding-step">Импорт завершён</span><button className="onboarding-support" type="button" aria-label="Позвонить в поддержку"><Phone aria-hidden="true" /></button></header><main className="summary-chat-main"><div className="summary-chat-thread"><div className="figma-ai-message"><span className="figma-ai-avatar">А</span><div><strong>Данные готовы к анализу</strong><p>Я обработал выписку и подготовил операции. Проверьте результат перед настройкой категорий.</p></div></div><div className="summary-file-message"><span className="processing-file-icon" aria-hidden="true" /><div><strong>{stats.fileName}</strong><small>{stats.period} · обработка завершена</small></div></div><section className="summary-chat-card"><div><strong>{stats.total.toLocaleString('ru-RU')}</strong><span>Всего операций</span></div><div className="summary-positive"><strong>{stats.auto.toLocaleString('ru-RU')}</strong><span>Распределено автоматически</span></div><div className="summary-attention"><strong>{stats.review.toLocaleString('ru-RU')}</strong><span>Требуют проверки</span></div><div><strong>{stats.unresolved.toLocaleString('ru-RU')}</strong><span>Пока не определены</span></div></section><div className="upload-chat-actions summary-chat-actions"><button type="button" onClick={onBack}>Назад</button><button type="button" onClick={onContinue}>Продолжить</button></div></div><div className="figma-upload-composer summary-chat-composer"><label><Plus aria-hidden="true" /><span>Спросить ИИ-Ассистента</span></label><button type="button" disabled aria-label="Продолжить"><ChevronRight aria-hidden="true" /></button></div></main></div>;
}

type ReviewGrouping = 'operations' | 'counterparty' | 'category';

function ReviewDirectionFilter({ selected, onChange }: { selected: string[]; onChange: (value: string[]) => void }) {
  const options = ['Все', 'Поступления', 'Списания'];
  const toggle = (value: string) => onChange(value === 'Все' ? ['Все'] : selected.includes(value) ? [] : [value]);
  return <div className="review-filter-dropdown review-filter-direction"><Dropdown value={selected.length ? selected.join(', ') : undefined} placeholder="Направление" closeOnSelect={false}>{options.map(option => <Cell key={option} title={option} onClick={() => toggle(option)} />)}</Dropdown></div>;
}

function ReviewOperationsTable({ items, grouping, selectedIds, onToggle, onChange }: { items: ReviewItem[]; grouping: ReviewGrouping; selectedIds: Set<string>; onToggle: (id: string) => void; onChange: (id: string, category: string) => void }) {
  const groups = grouping === 'operations' ? [{ label: '', items }] : Array.from(items.reduce((result, item) => { const label = grouping === 'category' ? item.category : item.counterparty; const group = result.get(label) ?? []; group.push(item); result.set(label, group); return result; }, new Map<string, ReviewItem[]>())).map(([label, groupItems]) => ({ label, items: groupItems }));
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => new Set(grouping === 'category' ? groups.map(group => group.label) : []));
  useEffect(() => { setCollapsedGroups(new Set(grouping === 'category' ? groups.map(group => group.label) : [])); }, [grouping]);
  const toggleGroup = (label: string) => setCollapsedGroups(value => { const next = new Set(value); if (next.has(label)) next.delete(label); else next.add(label); return next; });
  return <div className="review-table">{groups.map(group => { const isCategoryGroup = grouping === 'category' && Boolean(group.label); const isCollapsed = isCategoryGroup && collapsedGroups.has(group.label); return <div className="review-table-group" key={group.label || 'operations'}>{group.label && <div className={`review-table-group-heading ${isCollapsed ? 'is-collapsed' : ''}`}><button type="button" className="review-table-group-toggle" onClick={() => isCategoryGroup && toggleGroup(group.label)} disabled={!isCategoryGroup}><ChevronDown aria-hidden="true" /><strong>{group.label}</strong><span>{group.items.length}</span></button></div>}{!isCollapsed && group.items.map(item => <Table className={`review-table-row ${item.status !== 'pending' ? 'is-reviewed' : ''} ${selectedIds.has(item.id) ? 'is-selected' : ''}`} gridTemplateColumns="var(--review-grid-columns)" key={item.id}>
    <span className="review-row-selector"><span className="review-row-number" aria-hidden="true" />{item.status === 'pending' && <Checkbox isChecked={selectedIds.has(item.id)} label={`Выбрать операцию: ${item.description}`} onChange={() => onToggle(item.id)} />}</span>
    <TableCell title={item.description} titleStyle="500" />
    <TableCell title={item.date} className="review-date-cell" />
    <TableCell title={formatCurrency(item.amount)} titleStyle="500" className={item.amount < 0 ? 'review-amount-cell negative' : 'review-amount-cell'} />
    <TableCell title={item.category} titleStyle="400" className="review-category-cell" hasRightAccessory rightAccessory={<div className="review-category-accessory"><ChevronDown aria-hidden="true" /><div className="review-category-overlay"><CategoryDropdown value={item.category} placeholder="Выберите категорию" onChange={category => onChange(item.id, category)} disabled={item.status !== 'pending'} /></div></div>} />
  </Table>)}</div>})}</div>;
}

function TransactionReviewPage({ stats, onBack, onComplete, onItemsChange }: { stats: ImportStats; onBack: () => void; onComplete: () => void; onItemsChange: (items: ReviewItem[]) => void }) {
  const [items, setItems] = useState(() => createReviewItems(stats.reviewItems, stats.review));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewTable, setShowReviewTable] = useState(false);
  const [directionFilter, setDirectionFilter] = useState<string[]>([]);
  const [grouping, setGrouping] = useState<ReviewGrouping>('operations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const pending = items.filter(item => item.status === 'pending');
  const current = pending[currentIndex] ?? null;
  const filteredItems = items.filter(item => {
    const direction = item.amount >= 0 ? 'Поступления' : 'Списания';
    const query = searchQuery.trim().toLowerCase();
    return (!directionFilter.length || directionFilter.includes('Все') || directionFilter.includes(direction)) && (!query || [item.description, item.date, item.counterparty, item.category].some(value => value.toLowerCase().includes(query)));
  });
  const updateCurrent = (status: ReviewItem['status'], category = current?.category) => { if (!current) return; setItems(value => { const next = value.map(item => item.id === current.id ? { ...item, status, category: category ?? item.category } : item); onItemsChange(next); return next; }); setSelectedIds(value => { const next = new Set(value); next.delete(current.id); return next; }); setCurrentIndex(index => Math.min(index, Math.max(0, pending.length - 2))); };
  const updateItemCategory = (id: string, category: string) => setItems(value => { const next = value.map(item => item.id === id ? { ...item, category } : item); onItemsChange(next); return next; });
  const toggleSelected = (id: string) => setSelectedIds(value => { const next = new Set(value); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const visiblePendingIds = filteredItems.filter(item => item.status === 'pending').map(item => item.id);
  const selectedVisibleCount = visiblePendingIds.filter(id => selectedIds.has(id)).length;
  const selectAllVisible = () => setSelectedIds(value => new Set([...value, ...visiblePendingIds]));
  const clearSelection = () => setSelectedIds(new Set());
  const applyBulkCategory = (category: string) => { if (!selectedIds.size) return; setItems(value => { const next = value.map(item => selectedIds.has(item.id) && item.status === 'pending' ? { ...item, category, status: 'confirmed' as const } : item); onItemsChange(next); return next; }); clearSelection(); };
  const resetReview = () => { const next = createReviewItems(stats.reviewItems, stats.review); setItems(next); onItemsChange(next); setSelectedIds(new Set()); setCurrentIndex(0); };
  const processedCount = items.filter(item => item.status !== 'pending').length;
  return <div className="onboarding-page review-page review-assistant-page"><header className="onboarding-header"><ProductMark /><span className="onboarding-step">Проверка операций</span></header><main className="review-content"><span className="eyebrow">Проверка распределения</span><h1>Помогите уточнить данные</h1><p>Мы автоматически распределили большую часть операций. Проверьте те, где уверенность ниже.</p>{current && <div className="review-card-carousel"><button className="review-card-nav" type="button" aria-label="Предыдущая операция" disabled={currentIndex === 0} onClick={() => setCurrentIndex(index => Math.max(0, index - 1))}><ChevronLeft aria-hidden="true" /></button><section key={current.id} className="review-card"><div className="review-card-top"><span>Операция {currentIndex + 1} из {pending.length}</span><span className="confidence-badge">Нужна проверка</span></div><strong className={`review-amount ${current.amount < 0 ? 'negative' : ''}`}>{formatCurrency(current.amount)}</strong><div className="review-detail-grid"><div><span>Назначение</span><strong>{current.description}</strong></div><div><span>Дата и время</span><strong>{current.date} · 10:30</strong></div><div><span>Контрагент</span><strong>{current.counterparty}</strong></div><div><span>Текущая категория</span><strong>{current.category}</strong></div></div><div className="review-select"><CategoryDropdown value={current.category} placeholder="Выберите категорию" onChange={value => updateCurrent('pending', value)} /></div><div className="review-actions"><button type="button" onClick={() => updateCurrent('skipped')}>Пропустить</button><button type="button" className="review-confirm" onClick={() => updateCurrent('confirmed')}>Подтвердить</button></div></section><button className="review-card-nav" type="button" aria-label="Следующая операция" disabled={currentIndex >= pending.length - 1} onClick={() => setCurrentIndex(index => Math.min(pending.length - 1, index + 1))}><ChevronRight aria-hidden="true" /></button></div>}{!current && <div className="review-done"><strong>Спорные операции закончились</strong><span>Все спорные операции обработаны. Можно перейти в сервис.</span></div>}<section className={`review-table-section ${showReviewTable ? '' : 'is-collapsed'}`}><div className="review-table-header"><h2>Все спорные операции</h2>{processedCount > 0 && <button className="review-reset" type="button" onClick={resetReview}>Начать сначала</button>}<button className="review-table-toggle" type="button" aria-label={showReviewTable ? 'Свернуть список операций' : 'Развернуть список операций'} aria-expanded={showReviewTable} onClick={() => setShowReviewTable(value => !value)}><ChevronUp aria-hidden="true" /></button></div><ReviewProgress pending={pending.length} processed={processedCount} />{showReviewTable && <><div className="review-filters"><ReviewDirectionFilter selected={directionFilter} onChange={setDirectionFilter} /><div className="review-filter-dropdown"><Dropdown label="Группировать по" value={grouping === 'operations' ? 'Операциям' : grouping === 'counterparty' ? 'Контрагентам' : 'Категориям'}><Cell title="Операциям" onClick={() => setGrouping('operations')} /><Cell title="Контрагентам" onClick={() => setGrouping('counterparty')} /><Cell title="Категориям" onClick={() => setGrouping('category')} /></Dropdown></div><Search className="review-search" value={searchQuery} onChange={setSearchQuery} placeholder="Поиск" /></div>{selectedIds.size > 0 && <div className="review-bulk"><strong>Выбрано: {selectedIds.size}</strong><button type="button" onClick={selectAllVisible}>Выбрать все видимые</button><button type="button" onClick={clearSelection}>Снять выбор</button><div className="review-bulk-dropdown"><CategoryDropdown placeholder="Назначить категорию" onChange={applyBulkCategory} /></div></div>}</>}{showReviewTable && <ReviewOperationsTable items={filteredItems} grouping={grouping} selectedIds={selectedIds} onToggle={toggleSelected} onChange={updateItemCategory} />}</section></main><aside className="categories-chat review-assistant-chat"><div className="categories-chat-thread"><div className="categories-user-message">Загрузите файл: {stats.fileName}<small>17:52</small></div><div className="categories-ai-message"><strong><span>А*</span>Ассистент</strong><p>Файл принят. Начинаю разбор операций и уточню несколько деталей о вашем бизнесе.</p><small>17:52</small></div><div className="categories-user-message categories-context-message">Контекст бизнеса: выбранные ответы сохранены</div><div className="categories-ai-message"><strong><span>А*</span>Ассистент</strong><p>Данные готовы к анализу. Я обработал выписку и подготовил операции.</p><small>17:54</small></div><div className="categories-user-message categories-context-message">Категории выбраны: Выручка от продаж, Продажа активов, Получение кредитов<small>17:56</small></div><div className="categories-ai-message"><strong><span>А*</span>Ассистент</strong><p>Остался последний шаг. Выберите теперь для нераспределённых операций подходящие категории.</p><small>17:57</small></div><div className="categories-chat-actions"><button type="button" onClick={onBack}>Назад</button><button type="button" onClick={onComplete}>Перейти в сервис</button></div></div><div className="categories-chat-input"><span>Спросить ИИ-Ассистента</span><Plus aria-hidden="true" /><button type="button" aria-label="Отправить сообщение"><ChevronUp aria-hidden="true" /></button></div></aside></div>;
}

type SetupFlow = 'Поступления' | 'Списания';
type SetupCategory = { id: string; name: string; flow: SetupFlow; count: number; selected: boolean; children?: string[] };

const setupChildrenByCategory: Record<string, string[]> = {
  'Выручка от продаж': ['Продажи товаров', 'Продажи услуг', 'Онлайн-продажи'],
  'Продажа активов': ['Продажа оборудования', 'Продажа транспорта'],
  'Получение кредитов': ['Получение банковского кредита', 'Получение займа'],
  'Зарплата сотрудников': ['Зарплата производственного персонала', 'Зарплата административного персонала', 'Зарплата коммерческого персонала'],
  'Налоги и сборы': ['НДФЛ и страховые взносы', 'Налог на прибыль', 'Прочие налоги'],
  'Аренда помещений': ['Аренда офиса', 'Аренда склада'],
  'Коммунальные услуги': ['Электроэнергия', 'Водоснабжение и отопление'],
  'Маркетинг и реклама': ['Реклама', 'Продвижение', 'Маркетинговые услуги'],
  'Материалы и расходники': ['Основные материалы', 'Вспомогательные материалы', 'Упаковочные материалы', 'Расходные материалы'],
  'Покупка оборудования': ['Оборудование', 'Инструмент и оснастка'],
  'Разработка ПО': ['Разработка', 'Лицензии и подписки'],
  'Погашение кредитов': ['Погашение тела кредита', 'Проценты по кредитам и займам'],
  'Лизинговые платежи': ['Основной долг по лизингу', 'Проценты по лизингу'],
};

function CategorySetupPage({ onBack, onContinue, fileName, context }: { onBack?: () => void; onContinue: () => void; fileName?: string; context?: string }) {
  const [categories, setCategories] = useState<SetupCategory[]>(() => financeRows.map((row, index) => ({ id: row.id, name: row.name, flow: row.total >= 0 ? 'Поступления' : 'Списания', count: Object.values(row.data).filter(value => value !== 0).length, selected: index < 3, children: setupChildrenByCategory[row.name] })));
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [activeAddFlow, setActiveAddFlow] = useState<SetupFlow | null>(null);
  const addCategory = (flow: SetupFlow) => { const name = newCategory.trim(); if (!name) return; setCategories(items => [...items, { id: `custom-${Date.now()}`, name, flow, count: 0, selected: false }]); setNewCategory(''); setActiveAddFlow(null); };
  const renderFlow = (flow: SetupFlow) => <section className={`setup-flow ${flow === 'Поступления' ? 'setup-flow--incoming' : 'setup-flow--outgoing'}`}><div className="setup-flow-heading"><div><h2>{flow}</h2><p>{categories.filter(item => item.flow === flow).length} категорий</p></div></div><div className="setup-category-list">{categories.filter(item => item.flow === flow).map(item => { const expanded = expandedCategoryIds.includes(item.id); const hasChildren = Boolean(item.children?.length); return <div key={item.id}><div className="setup-category-item">{hasChildren ? <span className="setup-category-icon setup-category-toggle-wrap"><button className="setup-category-toggle" type="button" aria-expanded={expanded} aria-label={`${expanded ? 'Скрыть' : 'Показать'} подкатегории ${item.name}`} onClick={() => setExpandedCategoryIds(ids => ids.includes(item.id) ? ids.filter(id => id !== item.id) : [...ids, item.id])}>{expanded ? '−' : '+'}</button></span> : <span className="setup-category-icon setup-category-icon--empty" aria-hidden="true" />}<strong>{item.name}</strong><button type="button" aria-label={`Скрыть категорию ${item.name}`} onClick={() => setCategories(items => items.filter(category => category.id !== item.id))}>×</button></div>{expanded && item.children?.map(child => <div className="setup-category-item setup-category-item--child" key={`${item.id}-${child}`}><span className="setup-category-child-marker" aria-hidden="true" /> <strong>{child}</strong></div>)}</div>; })}</div>{activeAddFlow === flow ? <div className="setup-add"><input autoFocus value={newCategory} onChange={event => setNewCategory(event.target.value)} placeholder={`Добавить категорию в ${flow.toLowerCase()}`} onKeyDown={event => { if (event.key === 'Enter') addCategory(flow); }} /><button type="button" onClick={() => addCategory(flow)}>Добавить</button><button className="setup-add-cancel" type="button" onClick={() => { setNewCategory(''); setActiveAddFlow(null); }}>Отмена</button></div> : <button className="setup-add-trigger" type="button" onClick={() => { setActiveAddFlow(flow); setNewCategory(''); }}><Plus aria-hidden="true" />Добавить категорию</button>}</section>;
  return <div className="onboarding-page setup-page categories-page"><header className="onboarding-header"><ProductMark /><div className="categories-assistant"><span>А*</span><b>ИИ-Ассистент</b></div></header><aside className="categories-sidebar"><h2>Категории</h2></aside><main className="categories-content"><h1>Проверьте категории</h1><p>Мы собрали универсальную структуру потоков. Подтвердите её или добавьте свои категории.</p>{renderFlow('Поступления')}{renderFlow('Списания')}</main><aside className="categories-chat"><div className="categories-chat-thread"><div className="categories-user-message">Загрузите файл{fileName ? `: ${fileName}` : ''}<small>17:52</small></div><div className="categories-ai-message categories-history-message"><strong><span>А*</span>Ассистент</strong><p>Файл принят. Начинаю разбор операций и уточню несколько деталей о вашем бизнесе.</p><small>17:52</small></div><div className="categories-user-message">Контекст бизнеса: {context || 'заполнен'}</div><div className="categories-ai-message categories-history-message"><strong><span>А*</span>Ассистент</strong><p>Данные готовы к анализу. Я обработал выписку и подготовил операции.</p><small>17:54</small></div><div className="categories-ai-message"><strong><span>А*</span>Ассистент</strong><p>Всё ли категории удалось распознать верно? Если необходимо добавьте свои</p><small>17:55</small></div><div className="categories-chat-actions"><button type="button" onClick={onContinue}>Продолжить</button></div></div><div className="categories-chat-input"><span>Спросить ИИ-Ассистента</span><Plus aria-hidden="true" /><button type="button" aria-label="Отправить сообщение"><ChevronUp aria-hidden="true" /></button></div></aside></div>;
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
  const [assistantContext, setAssistantContext] = useState('');
  const [importStats, setImportStats] = useState<ImportStats | null>(() => readStored<ImportStats | null>('dds-import-stats', null));
  const [analyticsRows, setAnalyticsRows] = useState<FinanceRow[]>(() => readStored<FinanceRow[]>('dds-analytics-rows', financeRows));
  const [analyticsInsights, setAnalyticsInsights] = useState<AIInsight[]>(() => readStored<AIInsight[]>('dds-analytics-insights', aiInsights));
  const [surveyOpen, setSurveyOpen] = useState(false);
  const accountEmail = readStored<{ email?: string } | null>('dds-account', null)?.email ?? 'client@example.com';
  const currentRoute: AppRoute = createPage ? 'create-article' : activityPageKey ? 'activity' : mobileDetail ? 'mobile-detail' : 'overview';
  const flowState = { ...initialDDSFlowState, route: currentRoute };
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, [productStage, createPage, activityPageKey, mobileDetail]);
  useEffect(() => { window.localStorage.setItem('dds-stage', productStage); if (importStats) window.localStorage.setItem('dds-import-stats', JSON.stringify(importStats)); window.localStorage.setItem('dds-analytics-rows', JSON.stringify(analyticsRows)); window.localStorage.setItem('dds-analytics-insights', JSON.stringify(analyticsInsights)); }, [productStage, importStats, analyticsRows, analyticsInsights]);
  useEffect(() => { if (analyticsInsights.length < 3 || !analyticsInsights.some(insight => insight.severity === 'opportunity')) setAnalyticsInsights(buildDynamicInsights(analyticsRows)); }, [analyticsRows]);
  useEffect(() => { if (!highlightedRowIds.length) return; const timer = window.setTimeout(() => setHighlightedRowIds([]), 3000); return () => window.clearTimeout(timer); }, [highlightedRowIds]);
  const openInsight = (insight: AIInsight) => { setSelectedInsight(insight); setHighlightedRowIds(insight.relatedRowIds); setDrawerOpen(true); };
  const relatedRows = useMemo(() => selectedInsight ? analyticsRows.filter(row => selectedInsight.relatedRowIds.includes(row.id)) : [], [selectedInsight, analyticsRows]);
  const visibleCategories = categories.filter(({ key }) => activityFilter === 'Все направления' || (activityFilter === 'Операционная' && key === 'operating') || (activityFilter === 'Инвестиционная' && key === 'investment') || (activityFilter === 'Финансовая' && key === 'financial'));
  const visibleInsights = [...analyticsInsights].slice(0, 3).sort((left, right) => Number(left.severity === 'opportunity') - Number(right.severity === 'opportunity'));
  const pendingReviewItems = importStats?.reviewItems.filter(item => item.status === 'pending') ?? [];
  const reviewAmount = pendingReviewItems.reduce((sum, item) => sum + item.amount, 0);
  const activityOptions = ['Все направления', 'Операционная', 'Инвестиционная', 'Финансовая'];
  const quarterOptions = ['Все кварталы', '1 квартал', '2 квартал', '3 квартал', '4 квартал'];
  const cycle = (current: string, options: string[], setter: (value: string) => void) => setter(options[(options.indexOf(current) + 1) % options.length]);
  const handleRowClick = (row: FinanceRow) => { const insight = analyticsInsights.find(item => item.relatedRowIds.includes(row.id)); if (insight) openInsight(insight); };
  if (productStage === 'landing') return <LandingPage onStart={() => setProductStage('account')} />;
  if (productStage === 'account') return <AccountPage onBack={() => setProductStage('landing')} onContinue={() => setProductStage('upload')} />;
  if (productStage === 'upload') return <><AppHeader className="upload-shared-header" step={2} sectionLabel="Загрузка" /><FigmaUploadPage onBack={() => setProductStage('account')} onContinue={(file, context) => { const reviewItems = financeRows.slice(0, 5).map((row, index) => ({ id: `preview-${row.id}`, date: `2026-0${index + 1}-15`, amount: row.data.jan, description: row.description, counterparty: 'Контрагент не определён', suggestedCategory: row.name, status: 'pending' as const, category: row.name })); const stats = { total: 1248, auto: 1036, review: 212, unresolved: 100, period: 'Январь — Июнь 2026', fileName: file.name, reviewItems }; const importedRows = buildAnalyticsRows(reviewItems); setImportFile(file); setAssistantContext(context ?? ''); setImportStats(stats); setAnalyticsRows(importedRows); setAnalyticsInsights(buildDynamicInsights(importedRows)); setProductStage('category-setup'); }} /></>;
  if (productStage === 'importing' && importFile) return <><AppHeader step={4} sectionLabel="Анализ" /><ImportingPage file={importFile} onComplete={stats => { const importedRows = buildAnalyticsRows(stats.reviewItems); setImportStats(stats); setAnalyticsRows(importedRows); setAnalyticsInsights(buildDynamicInsights(importedRows)); setProductStage('distribution-summary'); }} /></>;
  if (productStage === 'distribution-summary' && importStats) return <><AppHeader onBack={() => setProductStage('business-context')} step={5} sectionLabel="Данные готовы" /><ImportSummaryPage stats={importStats} onBack={() => setProductStage('business-context')} onContinue={() => setProductStage('category-setup')} /></>;
  if (productStage === 'category-setup') return <><AppHeader step={6} sectionLabel="Категории" /><CategorySetupPage fileName={importFile?.name} context={assistantContext} onContinue={() => setProductStage('transaction-review')} /></>;
  if (productStage === 'transaction-review' && importStats) return <><AppHeader step={7} sectionLabel="Проверка" /><TransactionReviewPage stats={importStats} onBack={() => setProductStage('category-setup')} onItemsChange={items => setImportStats(current => current ? { ...current, reviewItems: items, unresolved: items.filter(item => item.status === 'pending').length } : current)} onComplete={() => { window.history.pushState({}, '', '/service'); setProductStage('analytics'); }} /></>;
  return <div className="tds-app-shell" data-product-stage={productStage} data-app-route={flowState.route}>
      <MainPageNavigationBar activeNavItem="main" customer={accountEmail} avatarInitials="" hasNewPush onNavPaymentsClick={() => setProductStage('landing')} />
    <div className="tds-workspace"><aside className="tds-sidebar"><button className="sidebar-back" type="button" aria-label="Назад" onClick={() => { if (createPage) setCreatePage(false); else if (activityPageKey) setActivityPageKey(null); else if (mobileDetail) setMobileDetail(null); else setProductStage('category-setup'); }}><ArrowLeft aria-hidden="true" /></button><h2 className="sidebar-title">{createPage ? <>Новая статья<br />расходов</> : 'ДДС'}</h2></aside>
      <main className={`tds-content ${createPage ? 'create-content' : ''} ${viewMode === 'simple' ? 'simple-mode' : 'table-mode'}`}>
        {createPage ? <CreateExpensePage onBack={() => setCreatePage(false)} onSubmit={() => setCreatePage(false)} /> : activityPageKey ? <ActivityDetailPage activityTitle={categories.find(category => category.key === activityPageKey)?.title ?? ''} rows={analyticsRows.filter(row => row.category === activityPageKey)} onBack={() => setActivityPageKey(null)} /> : mobileDetail ? <MobileActivityDetail activityTitle={categories.find(category => category.key === mobileDetail.key)?.title ?? ''} mode={mobileDetail.mode} rows={analyticsRows.filter(row => row.category === mobileDetail.key)} onBack={() => setMobileDetail(null)} /> : <>
        <div className="filter-row" aria-label="Фильтр таблицы"><Chip className={`filter-trigger ${filtersExpanded ? 'is-selected' : ''}`} variant="action" leftAccessory="icon" leftIcon={<svg className="filter-chip-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M11.25 9.4502C12.677 9.4502 13.8823 10.399 14.2695 11.7002H16.2002C16.697 11.7003 17.0994 12.1028 17.0996 12.5996C17.0996 13.0966 16.6972 13.4999 16.2002 13.5H14.2695C13.8822 14.8011 12.6769 15.75 11.25 15.75C9.82308 15.75 8.61775 14.8011 8.23047 13.5H1.7998C1.30284 13.4999 0.900391 13.0966 0.900391 12.5996C0.900602 12.1028 1.30297 11.7003 1.7998 11.7002H8.23047C8.61772 10.399 9.82304 9.4502 11.25 9.4502ZM11.25 11.25C10.5045 11.25 9.9006 11.8542 9.90039 12.5996C9.90039 13.3452 10.5044 13.9502 11.25 13.9502C11.9956 13.9502 12.5996 13.3452 12.5996 12.5996C12.5994 11.8542 11.9955 11.25 11.25 11.25ZM6.75 2.25C8.17692 2.25 9.38225 3.19888 9.76953 4.5H16.2002C16.6972 4.50011 17.0996 4.9034 17.0996 5.40039C17.0994 5.8972 16.697 6.2997 16.2002 6.2998H9.76953C9.38228 7.60097 8.17696 8.5498 6.75 8.5498C5.32304 8.5498 4.11772 7.60097 3.73047 6.2998H1.7998C1.30297 6.2997 0.900602 5.8972 0.900391 5.40039C0.900391 4.9034 1.30284 4.50011 1.7998 4.5H3.73047C4.11775 3.19888 5.32308 2.25 6.75 2.25ZM6.75 4.0498C6.00442 4.0498 5.40039 4.65481 5.40039 5.40039C5.4006 6.1458 6.00455 6.75 6.75 6.75C7.49545 6.75 8.0994 6.1458 8.09961 5.40039C8.09961 4.65481 7.49558 4.0498 6.75 4.0498Z" fill="#000000" /></svg>} onClick={() => setFiltersExpanded(value => !value)}>Фильтры</Chip><Chip variant="dropdown" value={activityFilter} onClick={() => cycle(activityFilter, activityOptions, setActivityFilter)}>По видам деятельности{activityFilter !== 'Все направления' ? `: ${activityFilter}` : ''}</Chip><Chip variant="dropdown" value={quarterFilter} onClick={() => cycle(quarterFilter, quarterOptions, setQuarterFilter)}>По кварталам{quarterFilter !== 'Все кварталы' ? `: ${quarterFilter}` : ''}</Chip><div className="desktop-mode-toggle"><Chip variant="tab" isSelected={viewMode === 'simple'} onClick={() => setViewMode('simple')}>Простой</Chip><Chip variant="tab" isSelected={viewMode === 'table'} onClick={() => setViewMode('table')}>Таблица</Chip></div></div>
        {filtersExpanded && <div className="filters-summary"><span>Активные фильтры</span><button type="button" onClick={() => { setActivityFilter('Все направления'); setQuarterFilter('Все кварталы'); }}>Сбросить</button></div>}
        <div className="filter-row filter-row--dropdowns" aria-label="Фильтр таблицы"><FilterDropdown label="Фильтры" placeholder="Фильтры" options={[filtersExpanded ? 'Скрыть фильтры' : 'Показать фильтры', 'Сбросить фильтры']} onChange={option => { if (option === 'Сбросить фильтры') { setActivityFilter('Все направления'); setQuarterFilter('Все кварталы'); setFiltersExpanded(false); } else setFiltersExpanded(value => !value); }} /><FilterDropdown label="По видам деятельности" placeholder="Все направления" value={activityFilter === 'Все направления' ? undefined : activityFilter} options={activityOptions} onChange={setActivityFilter} /><FilterDropdown label="По кварталам" placeholder="Все кварталы" value={quarterFilter === 'Все кварталы' ? undefined : quarterFilter} options={quarterOptions} onChange={setQuarterFilter} /><div className="desktop-mode-toggle"><Chip variant="tab" isSelected={viewMode === 'simple'} onClick={() => setViewMode('simple')}>Простой</Chip><Chip variant="tab" isSelected={viewMode === 'table'} onClick={() => setViewMode('table')}>Таблица</Chip></div></div>
        <section className="insights-panel"><div className="insights-heading"><div><button className="insights-title-button" type="button" onClick={() => setInsightsDrawerOpen(true)}><h2>Инсайты <ChevronRight aria-hidden="true" /></h2></button><p>Анализ вашего бизнеса</p></div><Sparkles className="insights-star-icon" aria-hidden="true" /></div><div className="insight-grid">{visibleInsights.map((insight, index) => { const isDistributionCard = insight.severity === 'opportunity' && Boolean(importStats?.unresolved); return <button className={`insight-card ${isDistributionCard ? 'insight-card--distribution' : ''}`} type="button" key={insight.id} onClick={() => isDistributionCard ? setProductStage('transaction-review') : openInsight(insight)}><span className={`insight-tag ${insight.severity === 'opportunity' ? 'is-purple' : ''}`}>{insight.severity === 'opportunity' ? 'Рекомендация' : 'Риск'}</span><strong>{isDistributionCard ? `Осталось ${importStats?.unresolved.toLocaleString('ru-RU')} операций не распределено` : insight.title}</strong><span className="insight-card-description">{isDistributionCard ? `${importStats?.unresolved.toLocaleString('ru-RU')} операции на сумму ${formatCurrency(reviewAmount)} — не учитываются сейчас в сервисе.` : insight.description}</span><span className="insight-card-footer"><span>{isDistributionCard ? 'Распределить' : 'Подробнее'}</span></span>{index === 0 && <span className="insight-dot" aria-hidden="true" />}</button>; })}</div><div className="mobile-insight-dots"><b /><i /><i /><i /><i /></div></section>
        <div className="category-list">{categories.map(({ key, title, icon }) => <CashFlowTable key={key} title={title} icon={icon} rows={analyticsRows.filter(row => row.category === key)} highlightedRowIds={highlightedRowIds} onRowClick={handleRowClick} onAdd={() => setCreatePage(true)} onOpenDetail={mode => setMobileDetail({ key, mode })} onOpenActivity={() => setActivityPageKey(key)} viewMode={viewMode} insights={analyticsInsights} />)}</div>
        <FeedbackBanner className="feedback-strip" primaryAction={{ label: 'Оставить отзыв', onClick: () => setSurveyOpen(true) }} secondaryAction={{ label: 'Позже' }}>Помогите нам сделать раздел удобнее</FeedbackBanner>
        </>}
      </main></div>{insightsDrawerOpen && <InsightsDrawer insights={analyticsInsights} onClose={() => setInsightsDrawerOpen(false)} onSelect={insight => { setInsightsDrawerOpen(false); openInsight(insight); }} />}<DetailsDrawerTDS isOpen={drawerOpen} insight={selectedInsight} relatedRows={relatedRows} onClose={() => setDrawerOpen(false)} onNavigateToRow={id => setHighlightedRowIds([id])} onAction={action => { setDrawerOpen(false); if (action === 'review') setProductStage('transaction-review'); else if (action === 'article') setCreatePage(true); else setSurveyOpen(true); }} />{surveyOpen && <BetaSurvey onClose={() => setSurveyOpen(false)} onSubmit={answer => window.localStorage.setItem('dds-beta-feedback', JSON.stringify({ ...answer, submittedAt: new Date().toISOString() }))} />}
  </div>;
}
