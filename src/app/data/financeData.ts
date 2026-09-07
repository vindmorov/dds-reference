// Finance Data Types
export type RowCategory = 'operating' | 'investment' | 'financial';
export type InsightSeverity = 'critical' | 'warning' | 'opportunity';

export interface MonthlyData {
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
}

export interface FinanceRow {
  id: string;
  category: RowCategory;
  name: string;
  description: string;
  data: MonthlyData;
  total: number;
}

export interface AIInsight {
  id: string;
  severity: InsightSeverity;
  title: string;
  description: string;
  relatedRowIds: string[];
  recommendation: string;
  impact: string;
}

// Finance Table Data (18 rows)
export const financeRows: FinanceRow[] = [
  // Operating Activities (8 rows)
  {
    id: 'op-1',
    category: 'operating',
    name: 'Выручка от продаж',
    description: 'Доход от основной деятельности',
    data: { jan: 2450000, feb: 2680000, mar: 2920000, apr: 3150000, may: 3380000, jun: 3610000 },
    total: 18190000
  },
  {
    id: 'op-2',
    category: 'operating',
    name: 'Зарплата сотрудников',
    description: 'Фонд оплаты труда',
    data: { jan: -850000, feb: -850000, mar: -920000, apr: -920000, may: -980000, jun: -980000 },
    total: -5500000
  },
  {
    id: 'op-3',
    category: 'operating',
    name: 'Налоги и сборы',
    description: 'НДС, налог на прибыль, страховые взносы',
    data: { jan: -490000, feb: -536000, mar: -584000, apr: -630000, may: -676000, jun: -722000 },
    total: -3638000
  },
  {
    id: 'op-4',
    category: 'operating',
    name: 'Аренда помещений',
    description: 'Офис и складские помещения',
    data: { jan: -180000, feb: -180000, mar: -180000, apr: -195000, may: -195000, jun: -195000 },
    total: -1125000
  },
  {
    id: 'op-5',
    category: 'operating',
    name: 'Коммунальные услуги',
    description: 'Электричество, вода, отопление',
    data: { jan: -45000, feb: -42000, mar: -38000, apr: -35000, may: -32000, jun: -30000 },
    total: -222000
  },
  {
    id: 'op-6',
    category: 'operating',
    name: 'Маркетинг и реклама',
    description: 'Продвижение и привлечение клиентов',
    data: { jan: -320000, feb: -350000, mar: -380000, apr: -420000, may: -450000, jun: -480000 },
    total: -2400000
  },
  {
    id: 'op-7',
    category: 'operating',
    name: 'Материалы и расходники',
    description: 'Закупка материалов для производства',
    data: { jan: -420000, feb: -460000, mar: -510000, apr: -550000, may: -590000, jun: -630000 },
    total: -3160000
  },
  {
    id: 'op-8',
    category: 'operating',
    name: 'Прочие операционные расходы',
    description: 'Канцтовары, связь, транспорт',
    data: { jan: -85000, feb: -92000, mar: -98000, apr: -105000, may: -112000, jun: -118000 },
    total: -610000
  },

  // Investment Activities (5 rows)
  {
    id: 'inv-1',
    category: 'investment',
    name: 'Покупка оборудования',
    description: 'Приобретение производственного оборудования',
    data: { jan: -850000, feb: 0, mar: -620000, apr: 0, may: 0, jun: -1200000 },
    total: -2670000
  },
  {
    id: 'inv-2',
    category: 'investment',
    name: 'Разработка ПО',
    description: 'Инвестиции в IT-инфраструктуру',
    data: { jan: -180000, feb: -180000, mar: -220000, apr: -220000, may: -260000, jun: -260000 },
    total: -1320000
  },
  {
    id: 'inv-3',
    category: 'investment',
    name: 'Научные исследования',
    description: 'R&D проекты и разработки',
    data: { jan: -120000, feb: -130000, mar: -140000, apr: -150000, may: -160000, jun: -170000 },
    total: -870000
  },
  {
    id: 'inv-4',
    category: 'investment',
    name: 'Долгосрочные инвестиции',
    description: 'Вложения в ценные бумаги',
    data: { jan: -500000, feb: 0, mar: 0, apr: -750000, may: 0, jun: 0 },
    total: -1250000
  },
  {
    id: 'inv-5',
    category: 'investment',
    name: 'Продажа активов',
    description: 'Реализация устаревшего оборудования',
    data: { jan: 0, feb: 280000, mar: 0, apr: 0, may: 0, jun: 450000 },
    total: 730000
  },

  // Financial Activities (3 rows)
  {
    id: 'fin-1',
    category: 'financial',
    name: 'Получение кредитов',
    description: 'Банковские займы для развития',
    data: { jan: 2000000, feb: 0, mar: 0, apr: 1500000, may: 0, jun: 0 },
    total: 3500000
  },
  {
    id: 'fin-2',
    category: 'financial',
    name: 'Погашение кредитов',
    description: 'Выплаты основного долга и процентов',
    data: { jan: -150000, feb: -165000, mar: -180000, apr: -195000, may: -210000, jun: -225000 },
    total: -1125000
  },
  {
    id: 'fin-3',
    category: 'financial',
    name: 'Лизинговые платежи',
    description: 'Ежемесячные платежи по лизингу',
    data: { jan: -95000, feb: -95000, mar: -95000, apr: -110000, may: -110000, jun: -110000 },
    total: -615000
  }
];

// AI Insights (5 insights)
export const aiInsights: AIInsight[] = [
  {
    id: 'insight-1',
    severity: 'critical',
    title: 'Критическое превышение расходов на маркетинг',
    description: 'Расходы на маркетинг выросли на 50% за последние 6 месяцев, но конверсия клиентов снизилась на 12%.',
    relatedRowIds: ['op-6', 'op-1'],
    recommendation: 'Провести аудит маркетинговых каналов, перераспределить бюджет в пользу более эффективных каналов. Рекомендуется сократить расходы на контекстную рекламу и увеличить долю контент-маркетинга.',
    impact: 'Потенциальная экономия: ~420,000₽ в месяц при сохранении текущего уровня продаж'
  },
  {
    id: 'insight-2',
    severity: 'critical',
    title: 'Высокая долговая нагрузка',
    description: 'Общий объем кредитов достиг 3.5 млн₽. Ежемесячные выплаты составляют 15% от выручки.',
    relatedRowIds: ['fin-1', 'fin-2', 'op-1'],
    recommendation: 'Рассмотреть возможность рефинансирования под более низкую ставку. Приоритизировать погашение кредитов с высокой процентной ставкой. Отложить новые заимствования до Q3 2026.',
    impact: 'Снижение процентных расходов на 180,000₽ в год при успешном рефинансировании'
  },
  {
    id: 'insight-3',
    severity: 'warning',
    title: 'Неравномерные инвестиции в оборудование',
    description: 'Крупные разовые покупки оборудования создают кассовые разрывы (январь: -850k, июнь: -1.2M).',
    relatedRowIds: ['inv-1'],
    recommendation: 'Перейти на равномерный график закупок или рассмотреть лизинговые схемы для крупного оборудования. Создать резервный фонд для плановых инвестиций.',
    impact: 'Стабилизация денежного потока, снижение рисков кассовых разрывов'
  },
  {
    id: 'insight-4',
    severity: 'warning',
    title: 'Рост себестоимости опережает рост выручки',
    description: 'Расходы на материалы выросли на 50% (с 420k до 630k), в то время как выручка выросла только на 47%.',
    relatedRowIds: ['op-7', 'op-1'],
    recommendation: 'Провести переговоры с поставщиками о более выгодных условиях закупок. Рассмотреть альтернативных поставщиков. Оптимизировать производственные процессы для снижения отходов.',
    impact: 'Потенциальное снижение себестоимости на 8-12% при оптимизации закупок'
  },
  {
    id: 'insight-5',
    severity: 'opportunity',
    title: 'Устойчивый рост выручки - возможность масштабирования',
    description: 'Выручка демонстрирует стабильный рост 9-10% месяц к месяцу. Trend линейный и предсказуемый.',
    relatedRowIds: ['op-1'],
    recommendation: 'Использовать положительную динамику для привлечения инвестиций или расширения производства. Рекомендуется увеличить штат отдела продаж на 2-3 специалиста для ускорения роста до 15% в месяц.',
    impact: 'Прогнозируемая дополнительная выручка: ~1.8 млн₽ за Q3-Q4 2026 при масштабировании'
  }
];

// Helper functions
export function getCategoryName(category: RowCategory): string {
  switch (category) {
    case 'operating': return 'Операционная деятельность';
    case 'investment': return 'Инвестиционная деятельность';
    case 'financial': return 'Финансовая деятельность';
  }
}

export function getCategoryColor(category: RowCategory): string {
  switch (category) {
    case 'operating': return '#3B82F6'; // blue
    case 'investment': return '#8B5CF6'; // purple
    case 'financial': return '#F59E0B'; // amber
  }
}

export function getSeverityColor(severity: InsightSeverity): string {
  switch (severity) {
    case 'critical': return '#EF4444'; // red
    case 'warning': return '#F59E0B'; // amber
    case 'opportunity': return '#22C55E'; // green
  }
}

export function getSeverityIcon(severity: InsightSeverity): string {
  switch (severity) {
    case 'critical': return 'AlertCircle';
    case 'warning': return 'AlertTriangle';
    case 'opportunity': return 'TrendingUp';
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}
