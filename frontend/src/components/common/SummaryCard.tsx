// components/common/SummaryCard.tsx
import React, { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: string;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  progress?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  change,
  color,
  trend = 'up',
  description,
  progress
}) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendBgColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'bg-green-50 text-green-700';
      case 'down':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const renderTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group hover:border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: `${color}15` }}
          >
            <div style={{ color: color }}>
              {icon}
            </div>
          </div>
          <div className="text-gray-900 font-medium">{title}</div>
        </div>
        
        {change && (
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getTrendBgColor(trend)}`}>
            {renderTrendIcon(trend)}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        
        {description && (
          <div className="text-sm text-gray-600">{description}</div>
        )}
      </div>
      
      {/* Progress bar (optional) */}
      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: progress > 70 ? '#10B981' : progress > 40 ? '#F59E0B' : '#EF4444'
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;