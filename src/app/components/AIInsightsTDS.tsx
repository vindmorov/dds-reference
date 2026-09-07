import { AlertCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { AIInsight, getSeverityIcon } from '../data/financeData';

interface AIInsightsTDSProps {
  insights: AIInsight[];
  onInsightClick: (insight: AIInsight) => void;
}

export function AIInsightsTDS({ insights, onInsightClick }: AIInsightsTDSProps) {
  const getIcon = (severity: AIInsight['severity']) => {
    const iconName = getSeverityIcon(severity);
    const props = { className: "w-5 h-5", strokeWidth: 2 };

    switch (iconName) {
      case 'AlertCircle': return <AlertCircle {...props} />;
      case 'AlertTriangle': return <AlertTriangle {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      default: return <AlertCircle {...props} />;
    }
  };

  const getSeverityLabel = (severity: AIInsight['severity']) => {
    switch (severity) {
      case 'critical': return 'Критично';
      case 'warning': return 'Предупреждение';
      case 'opportunity': return 'Возможность';
    }
  };

  return (
    <div className="bg-white border border-[rgba(174,174,174,0.45)] rounded-[10px] p-4 md:p-5">
      <h3 className="text-[15px] md:text-[16px] font-semibold text-[#191919] mb-3 md:mb-4">AI Инсайты</h3>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {insights.map(insight => (
          <InsightCard
            key={insight.id}
            insight={insight}
            onClick={() => onInsightClick(insight)}
            getIcon={getIcon}
            getSeverityLabel={getSeverityLabel}
          />
        ))}
      </div>
    </div>
  );
}

interface InsightCardProps {
  insight: AIInsight;
  onClick: () => void;
  getIcon: (severity: AIInsight['severity']) => JSX.Element;
  getSeverityLabel: (severity: AIInsight['severity']) => string;
}

function InsightCard({ insight, onClick, getIcon, getSeverityLabel }: InsightCardProps) {
  const getSeverityTextColor = () => {
    switch (insight.severity) {
      case 'critical': return 'text-[#D84D4D]';
      case 'warning': return 'text-[#F59E0B]';
      case 'opportunity': return 'text-[#22C55E]';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[rgba(174,174,174,0.45)] rounded-[10px] p-4 md:p-5 min-w-[280px] md:min-w-[380px] max-w-[280px] md:max-w-[380px] cursor-pointer hover:border-[#835DE1] hover:shadow-md transition-all duration-200 flex-shrink-0"
    >
      <div className="flex flex-col gap-2 md:gap-3 h-full">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between gap-2 md:gap-3">
          <div className={getSeverityTextColor()}>
            {getIcon(insight.severity)}
          </div>
          <span className={`text-[10px] md:text-xs font-medium ${getSeverityTextColor()}`}>
            {getSeverityLabel(insight.severity)}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-semibold text-[#191919] text-[14px] md:text-[15px] leading-tight line-clamp-2">
          {insight.title}
        </h4>

        {/* Description */}
        <p className="text-[13px] md:text-sm text-[#676767] leading-relaxed line-clamp-3 flex-1">
          {insight.description}
        </p>
      </div>
    </div>
  );
}
