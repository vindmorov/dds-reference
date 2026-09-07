import { FinanceRow, getCategoryName, formatCurrency } from '../data/financeData';
import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

interface FinanceTableTDSProps {
  rows: FinanceRow[];
  highlightedRowIds: string[];
  onRowClick: (row: FinanceRow) => void;
}

export function FinanceTableTDS({ rows, highlightedRowIds, onRowClick }: FinanceTableTDSProps) {
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to highlighted row
  useEffect(() => {
    if (highlightedRowIds.length > 0) {
      const firstHighlightedId = highlightedRowIds[0];
      if (isMobile) {
        const cardElement = cardRefs.current[firstHighlightedId];
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        const rowElement = rowRefs.current[firstHighlightedId];
        if (rowElement) {
          rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [highlightedRowIds, isMobile]);

  const groupedRows = {
    operating: rows.filter(r => r.category === 'operating'),
    investment: rows.filter(r => r.category === 'investment'),
    financial: rows.filter(r => r.category === 'financial')
  };

  const months = [
    { key: 'jan', label: 'Янв' },
    { key: 'feb', label: 'Фев' },
    { key: 'mar', label: 'Мар' },
    { key: 'apr', label: 'Апр' },
    { key: 'may', label: 'Май' },
    { key: 'jun', label: 'Июн' }
  ];

  return (
    <div className="bg-white border border-[rgba(174,174,174,0.45)] rounded-[10px] p-4 md:p-5">
      <div className="mb-3 md:mb-4">
        <h3 className="text-[15px] md:text-[16px] font-semibold text-[#191919]">Финансовые данные</h3>
        <p className="text-[13px] text-[#676767]">Январь - Июнь 2026</p>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[rgba(174,174,174,0.45)]">
              <th className="text-left p-[10px] px-[15px] text-[14px] font-normal text-[#676767] tracking-[0.14px] sticky left-0 bg-white z-10">
                Категория / Статья
              </th>
              {months.map(month => (
                <th key={month.key} className="text-right p-[10px] px-[15px] text-[14px] font-normal text-[#676767] tracking-[0.14px] min-w-[100px]">
                  {month.label}
                </th>
              ))}
              <th className="text-right p-[10px] px-[15px] text-[14px] font-normal text-[#676767] tracking-[0.14px] min-w-[120px]">
                Итого
              </th>
              <th className="w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            <CategorySection
              title={getCategoryName('operating')}
              rows={groupedRows.operating}
              months={months}
              highlightedRowIds={highlightedRowIds}
              onRowClick={onRowClick}
              rowRefs={rowRefs}
            />
            <CategorySection
              title={getCategoryName('investment')}
              rows={groupedRows.investment}
              months={months}
              highlightedRowIds={highlightedRowIds}
              onRowClick={onRowClick}
              rowRefs={rowRefs}
            />
            <CategorySection
              title={getCategoryName('financial')}
              rows={groupedRows.financial}
              months={months}
              highlightedRowIds={highlightedRowIds}
              onRowClick={onRowClick}
              rowRefs={rowRefs}
            />
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        <MobileCategorySection
          title={getCategoryName('operating')}
          rows={groupedRows.operating}
          months={months}
          highlightedRowIds={highlightedRowIds}
          onRowClick={onRowClick}
          cardRefs={cardRefs}
        />
        <MobileCategorySection
          title={getCategoryName('investment')}
          rows={groupedRows.investment}
          months={months}
          highlightedRowIds={highlightedRowIds}
          onRowClick={onRowClick}
          cardRefs={cardRefs}
        />
        <MobileCategorySection
          title={getCategoryName('financial')}
          rows={groupedRows.financial}
          months={months}
          highlightedRowIds={highlightedRowIds}
          onRowClick={onRowClick}
          cardRefs={cardRefs}
        />
      </div>
    </div>
  );
}

// Desktop Table Section
interface CategorySectionProps {
  title: string;
  rows: FinanceRow[];
  months: { key: string; label: string }[];
  highlightedRowIds: string[];
  onRowClick: (row: FinanceRow) => void;
  rowRefs: React.MutableRefObject<{ [key: string]: HTMLTableRowElement | null }>;
}

function CategorySection({ title, rows, months, highlightedRowIds, onRowClick, rowRefs }: CategorySectionProps) {
  return (
    <>
      <tr className="border-b border-[rgba(174,174,174,0.45)] bg-[rgba(25,25,25,0.05)]">
        <td
          className="p-[10px] px-[15px] text-[14px] font-semibold text-[#191919] sticky left-0 bg-[rgba(25,25,25,0.05)] z-10"
          colSpan={9}
        >
          {title}
        </td>
      </tr>
      {rows.map(row => {
        const isHighlighted = highlightedRowIds.includes(row.id);
        return (
          <tr
            key={row.id}
            ref={el => { rowRefs.current[row.id] = el; }}
            onClick={() => onRowClick(row)}
            className={`
              border-b border-[rgba(174,174,174,0.45)] cursor-pointer transition-all duration-200
              hover:bg-[rgba(131,93,225,0.05)]
              ${isHighlighted ? 'bg-[rgba(131,93,225,0.1)]' : 'bg-white'}
            `}
          >
            <td className="p-[10px] px-[15px] sticky left-0 bg-inherit z-10">
              <div className="text-[14px] font-medium text-[#191919] tracking-[0.14px]">{row.name}</div>
              <div className="text-[13px] text-[#676767] tracking-[0.13px] mt-0.5">{row.description}</div>
            </td>
            {months.map(month => {
              const value = row.data[month.key as keyof typeof row.data];
              return (
                <td key={month.key} className="p-[10px] px-[15px] text-right font-mono text-[14px] tracking-[0.14px]">
                  <span className={value >= 0 ? 'text-[#22C55E]' : 'text-[#D84D4D]'}>
                    {formatCurrency(value)}
                  </span>
                </td>
              );
            })}
            <td className="p-[10px] px-[15px] text-right font-mono text-[14px] font-semibold tracking-[0.14px]">
              <span className={row.total >= 0 ? 'text-[#22C55E]' : 'text-[#D84D4D]'}>
                {formatCurrency(row.total)}
              </span>
            </td>
            <td className="p-[10px]">
              <button className="cursor-pointer p-1 hover:bg-[rgba(25,25,25,0.05)] rounded transition-colors">
                <MoreHorizontal className="w-5 h-5 text-[#676767]" />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

// Mobile Cards Section
interface MobileCategorySectionProps {
  title: string;
  rows: FinanceRow[];
  months: { key: string; label: string }[];
  highlightedRowIds: string[];
  onRowClick: (row: FinanceRow) => void;
  cardRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

function MobileCategorySection({ title, rows, months, highlightedRowIds, onRowClick, cardRefs }: MobileCategorySectionProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (rowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-2">
      <div className="px-3 py-2 bg-[rgba(25,25,25,0.05)] rounded-lg">
        <h3 className="text-sm font-semibold text-[#191919]">{title}</h3>
      </div>
      {rows.map(row => {
        const isHighlighted = highlightedRowIds.includes(row.id);
        const isExpanded = expandedRows.has(row.id);

        return (
          <div
            key={row.id}
            ref={el => { cardRefs.current[row.id] = el; }}
            className={`
              border border-[rgba(174,174,174,0.45)] rounded-lg overflow-hidden transition-all duration-200
              ${isHighlighted ? 'border-[#835DE1] bg-[rgba(131,93,225,0.05)]' : 'bg-white'}
            `}
          >
            <div onClick={() => onRowClick(row)} className="cursor-pointer flex items-center justify-between gap-2 p-3">
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-[#191919]">{row.name}</div>
                <div className="text-[13px] text-[#676767] mt-0.5">{row.description}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`font-mono text-sm font-semibold ${row.total >= 0 ? 'text-[#22C55E]' : 'text-[#D84D4D]'}`}>
                  {formatCurrency(row.total)}
                </span>
                <button
                  onClick={(e) => toggleExpand(row.id, e)}
                  className="p-1 hover:bg-[rgba(25,25,25,0.05)] rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#676767]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#676767]" />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="px-4 pb-4 pt-2 border-t border-[rgba(174,174,174,0.45)] bg-[rgba(25,25,25,0.02)]">
                <div className="space-y-2">
                  {months.map(month => {
                    const value = row.data[month.key as keyof typeof row.data];
                    return (
                      <div key={month.key} className="flex justify-between items-center">
                        <span className="text-sm text-[#676767]">{month.label}</span>
                        <span className={`font-mono text-sm ${value >= 0 ? 'text-[#22C55E]' : 'text-[#D84D4D]'}`}>
                          {formatCurrency(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
