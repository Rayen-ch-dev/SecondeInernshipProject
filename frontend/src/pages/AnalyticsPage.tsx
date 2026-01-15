// pages/AnalyticsPage.tsx
import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Target,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeMetric, setActiveMetric] = useState('revenue');

  // Revenue Data
  const revenueData = [
    { month: 'Jan', revenue: 4200, bookings: 3, inquiries: 12 },
    { month: 'Feb', revenue: 3200, bookings: 2, inquiries: 10 },
    { month: 'Mar', revenue: 7800, bookings: 5, inquiries: 18 },
    { month: 'Apr', revenue: 9200, bookings: 7, inquiries: 22 },
    { month: 'May', revenue: 12500, bookings: 10, inquiries: 28 },
    { month: 'Jun', revenue: 9800, bookings: 8, inquiries: 25 },
    { month: 'Jul', revenue: 8200, bookings: 6, inquiries: 20 },
    { month: 'Aug', revenue: 7200, bookings: 5, inquiries: 18 },
  ];

  // Source Data
  const sourceData = [
    { name: 'Instagram', value: 45, color: '#E4405F', growth: 12 },
    { name: 'Facebook', value: 25, color: '#1877F2', growth: 8 },
    { name: 'Referrals', value: 15, color: '#00C851', growth: 20 },
    { name: 'Google', value: 10, color: '#4285F4', growth: 5 },
    { name: 'Direct', value: 5, color: '#FF9F43', growth: -2 },
  ];

  // Package Performance
  const packageData = [
    { package: 'Platinum', revenue: 28000, clients: 14, avgPrice: 2000, growth: 15 },
    { package: 'Gold', revenue: 15000, clients: 10, avgPrice: 1500, growth: 8 },
    { package: 'Silver', revenue: 4000, clients: 4, avgPrice: 1000, growth: -5 },
  ];

  // Monthly Performance
  const monthlyPerformance = [
    { metric: 'Revenue', current: 45200, previous: 38500, change: 17.4, trend: 'up' },
    { metric: 'Bookings', current: 28, previous: 25, change: 12.0, trend: 'up' },
    { metric: 'Avg. Value', current: 1614, previous: 1540, change: 4.8, trend: 'up' },
    { metric: 'Conversion', current: 42, previous: 38, change: 10.5, trend: 'up' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label} 2024</p>
          <div className="space-y-2">
            {payload.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color || item.stroke }}
                  ></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">
                  {item.name.includes('Revenue') || item.name.includes('Value') 
                    ? `${item.value.toLocaleString()} TND`
                    : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const handleExport = () => {
    console.log('Exporting analytics data...');
    // Implement export logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Analytics</h2>
          <p className="text-gray-600">Detailed insights and performance metrics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {monthlyPerformance.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${
                  item.metric === 'Revenue' ? 'bg-blue-100' :
                  item.metric === 'Bookings' ? 'bg-green-100' :
                  item.metric === 'Avg. Value' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  {item.metric === 'Revenue' && <DollarSign className="w-6 h-6 text-blue-600" />}
                  {item.metric === 'Bookings' && <Calendar className="w-6 h-6 text-green-600" />}
                  {item.metric === 'Avg. Value' && <Target className="w-6 h-6 text-purple-600" />}
                  {item.metric === 'Conversion' && <Activity className="w-6 h-6 text-orange-600" />}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {item.metric === 'Revenue' || item.metric === 'Avg. Value' 
                      ? `${item.current.toLocaleString()} TND`
                      : item.metric === 'Conversion'
                      ? `${item.current}%`
                      : item.current}
                  </div>
                  <div className="text-sm text-gray-600">{item.metric}</div>
                </div>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                item.trend === 'up' 
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}>
                {item.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {item.change}%
              </div>
            </div>
            <div className="text-sm text-gray-600">
              vs {item.previous.toLocaleString()} {item.metric === 'Conversion' ? '%' : item.metric === 'Revenue' || item.metric === 'Avg. Value' ? 'TND' : ''} previous period
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <p className="text-sm text-gray-600">Monthly wedding revenue performance</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  activeMetric === 'revenue'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveMetric('revenue')}
              >
                Revenue
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  activeMetric === 'bookings'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveMetric('bookings')}
              >
                Bookings
              </button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey={activeMetric === 'revenue' ? 'revenue' : 'bookings'}
                  name={activeMetric === 'revenue' ? 'Wedding Revenue' : 'Bookings'}
                  stroke={activeMetric === 'revenue' ? '#2E5BFF' : '#00C851'}
                  fill={activeMetric === 'revenue' ? '#2E5BFF' : '#00C851'}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="inquiries"
                  name="Inquiries"
                  stroke="#FF9F43"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
              <p className="text-sm text-gray-600">Where your clients come from</p>
            </div>
            <BarChart3 className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-1/2 pl-0 lg:pl-6 mt-6 lg:mt-0">
              <div className="space-y-4">
                {sourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: source.color }}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-900">{source.name}</div>
                        <div className="text-sm text-gray-600">{source.value}% of leads</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      source.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {source.growth >= 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {source.growth >= 0 ? '+' : ''}{source.growth}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Package Performance</h3>
            <p className="text-sm text-gray-600">Revenue by wedding package</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              47,000 TND
            </div>
            <div className="text-sm text-gray-600">Total package revenue</div>
          </div>
        </div>
        <div className="space-y-6">
          {packageData.map((pkg, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: 
                        pkg.package === 'Platinum' ? '#2E5BFF' :
                        pkg.package === 'Gold' ? '#00C851' : '#FF9F43'
                    }}
                  ></div>
                  <span className="font-medium text-gray-900">{pkg.package}</span>
                  <span className="text-sm text-gray-600">{pkg.clients} clients</span>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  pkg.growth >= 0 
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {pkg.growth >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {pkg.growth >= 0 ? '+' : ''}{pkg.growth}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(pkg.revenue / 47000) * 100}%`,
                    backgroundColor: 
                      pkg.package === 'Platinum' ? '#2E5BFF' :
                      pkg.package === 'Gold' ? '#00C851' : '#FF9F43'
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="text-gray-600">
                  Avg. price: {pkg.avgPrice} TND
                </div>
                <div className="font-semibold text-gray-900">
                  {pkg.revenue.toLocaleString()} TND
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Trends & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seasonal Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Seasonal Trends</h3>
              <p className="text-sm text-gray-600">Wedding bookings by season</p>
            </div>
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { season: 'Spring', revenue: '18.5K', bookings: 12, trend: '+40%', color: 'bg-green-100 text-green-800' },
              { season: 'Summer', revenue: '15.2K', bookings: 9, trend: '+25%', color: 'bg-blue-100 text-blue-800' },
              { season: 'Fall', revenue: '8.5K', bookings: 5, trend: '-15%', color: 'bg-orange-100 text-orange-800' },
              { season: 'Winter', revenue: '3.0K', bookings: 2, trend: '-30%', color: 'bg-gray-100 text-gray-800' },
            ].map((season, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${season.color}`}>
                  {season.season}
                </div>
                <div className="text-2xl font-bold text-gray-900">{season.revenue}</div>
                <div className="text-sm text-gray-600 mb-2">{season.bookings} weddings</div>
                <div className={`text-sm font-medium ${
                  season.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {season.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
              <p className="text-sm text-gray-600">From inquiry to booking</p>
            </div>
            <Target className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-6">
            {[
              { stage: 'Website Visit', count: 1250, rate: '100%' },
              { stage: 'Inquiry Form', count: 350, rate: '28%' },
              { stage: 'Consultation', count: 210, rate: '60%' },
              { stage: 'Proposal Sent', count: 175, rate: '83%' },
              { stage: 'Booking', count: 140, rate: '80%' },
            ].map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">{stage.stage}</span>
                  <span className="text-gray-600">{stage.count} ({stage.rate})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-600"
                    style={{ 
                      width: 
                        stage.stage === 'Website Visit' ? '100%' :
                        stage.stage === 'Inquiry Form' ? '28%' :
                        stage.stage === 'Consultation' ? '60%' :
                        stage.stage === 'Proposal Sent' ? '83%' : '80%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Overall Conversion</span>
                <span className="font-bold text-blue-600">11.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;