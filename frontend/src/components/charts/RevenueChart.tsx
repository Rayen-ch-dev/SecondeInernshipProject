// components/charts/RevenueChart.tsx
import React from 'react';
import {
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface RevenueChartProps {
  filterYear?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ filterYear = '2024' }) => {
  // Mock data based on year filter
  const getDataByYear = (year: string) => {
    if (year === '2023') {
      return [
        { month: 'Jan', weddingRevenue: 1000, otherEvents: 600 },
        { month: 'Feb', weddingRevenue: 800, otherEvents: 500 },
        { month: 'Mar', weddingRevenue: 3800, otherEvents: 1000 },
        { month: 'Apr', weddingRevenue: 4200, otherEvents: 1200 },
        { month: 'May', weddingRevenue: 6800, otherEvents: 900 },
        { month: 'Jun', weddingRevenue: 5500, otherEvents: 700 },
        { month: 'Jul', weddingRevenue: 3500, otherEvents: 400 },
        { month: 'Aug', weddingRevenue: 3200, otherEvents: 300 },
        { month: 'Sep', weddingRevenue: 5200, otherEvents: 1000 },
        { month: 'Oct', weddingRevenue: 2800, otherEvents: 800 },
        { month: 'Nov', weddingRevenue: 2200, otherEvents: 600 },
        { month: 'Dec', weddingRevenue: 1200, otherEvents: 500 },
      ];
    }
    
    // Default 2024 data
    return [
      { month: 'Jan', weddingRevenue: 1200, otherEvents: 800 },
      { month: 'Feb', weddingRevenue: 800, otherEvents: 600 },
      { month: 'Mar', weddingRevenue: 4500, otherEvents: 1200 },
      { month: 'Apr', weddingRevenue: 5200, otherEvents: 1500 },
      { month: 'May', weddingRevenue: 8200, otherEvents: 1000 },
      { month: 'Jun', weddingRevenue: 6800, otherEvents: 800 },
      { month: 'Jul', weddingRevenue: 4200, otherEvents: 500 },
      { month: 'Aug', weddingRevenue: 3800, otherEvents: 400 },
      { month: 'Sep', weddingRevenue: 6500, otherEvents: 1200 },
      { month: 'Oct', weddingRevenue: 3200, otherEvents: 900 },
      { month: 'Nov', weddingRevenue: 2800, otherEvents: 700 },
      { month: 'Dec', weddingRevenue: 1500, otherEvents: 600 },
    ];
  };

  const data = getDataByYear(filterYear);
  
  // Calculate totals
  const totalWeddingRevenue = data.reduce((sum, item) => sum + item.weddingRevenue, 0);
  const totalOtherEvents = data.reduce((sum, item) => sum + item.otherEvents, 0);
  const growth = filterYear === '2023' ? 18 : 12; // Mock growth percentage

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label} {filterYear}</p>
          <div className="space-y-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-gray-700">Wedding Revenue:</span>
              <span className="font-bold text-gray-900">{payload[0].value} TND</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-gray-700">Other Events:</span>
              <span className="font-bold text-gray-900">{payload[1].value} TND</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-600">Wedding Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-600">Other Events</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {totalWeddingRevenue.toLocaleString()} TND
          </div>
          <div className="text-sm text-green-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +{growth}% from previous year
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickFormatter={(value) => `${value / 1000}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="weddingRevenue"
            name="Wedding Revenue"
            stroke="#2E5BFF"
            fill="#2E5BFF"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="otherEvents"
            name="Other Events"
            stroke="#8C9EB5"
            fill="#8C9EB5"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data.reduce((max, item) => Math.max(max, item.weddingRevenue), 0).toLocaleString()} TND
          </div>
          <div className="text-sm text-gray-600">Peak Month</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(totalWeddingRevenue / data.length).toLocaleString()} TND
          </div>
          <div className="text-sm text-gray-600">Monthly Average</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {totalOtherEvents.toLocaleString()} TND
          </div>
          <div className="text-sm text-gray-600">Other Events Total</div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;