// components/charts/PackagePerformance.tsx
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Star, Users, DollarSign } from 'lucide-react';

const PackagePerformance: React.FC = () => {
  const [activePackage, setActivePackage] = useState<string>('platinum');

  const packageData = [
    { name: 'Platinum', value: 28000, color: '#2E5BFF', clients: 14, avgPrice: 2000, growth: 15 },
    { name: 'Gold', value: 15000, color: '#00C851', clients: 10, avgPrice: 1500, growth: 8 },
    { name: 'Silver', value: 4000, color: '#FF9F43', clients: 4, avgPrice: 1000, growth: -5 },
    { name: 'Custom', value: 2000, color: '#8C9EB5', clients: 2, avgPrice: 1000, growth: 3 },
  ];

  const totalRevenue = packageData.reduce((sum, item) => sum + item.value, 0);
  
  const selectedPackage = packageData.find(pkg => pkg.name.toLowerCase() === activePackage);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">{data.name} Package</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-bold">{data.value.toLocaleString()} TND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clients:</span>
              <span className="font-medium">{data.clients}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Price:</span>
              <span className="font-medium">{data.avgPrice} TND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth:</span>
              <span className={`font-medium ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.growth >= 0 ? '+' : ''}{data.growth}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Package Performance</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {totalRevenue.toLocaleString()} TND
          </div>
          <div className="text-sm text-gray-600">Total Package Revenue</div>
        </div>
      </div>

      <div className="flex items-center">
        {/* Pie Chart */}
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={packageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onClick={(data) => setActivePackage(data.name.toLowerCase())}
              >
                {packageData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className={`cursor-pointer transition-opacity ${
                      activePackage === entry.name.toLowerCase() 
                        ? 'opacity-100' 
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Package Details */}
        <div className="w-1/2 pl-6">
          {selectedPackage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: selectedPackage.color }}
                  ></div>
                  <span className="font-bold text-lg text-gray-900">{selectedPackage.name}</span>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  selectedPackage.growth >= 0 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {selectedPackage.growth >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {selectedPackage.growth >= 0 ? '+' : ''}{selectedPackage.growth}%
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>Revenue</span>
                  </div>
                  <div className="font-bold text-gray-900">
                    {selectedPackage.value.toLocaleString()} TND
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Clients</span>
                  </div>
                  <div className="font-bold text-gray-900">
                    {selectedPackage.clients} clients
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>Avg. Price</span>
                  </div>
                  <div className="font-bold text-gray-900">
                    {selectedPackage.avgPrice} TND
                  </div>
                </div>
              </div>

              {/* Revenue Share */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Revenue Share</span>
                  <span className="font-medium">
                    {((selectedPackage.value / totalRevenue) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${(selectedPackage.value / totalRevenue) * 100}%`,
                      backgroundColor: selectedPackage.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Package Comparison */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Package Comparison</h4>
        <div className="grid grid-cols-4 gap-4">
          {packageData.map(pkg => (
            <button
              key={pkg.name}
              className={`p-3 rounded-lg transition-all ${
                activePackage === pkg.name.toLowerCase()
                  ? 'ring-2 ring-offset-2'
                  : 'hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: `${pkg.color}10`,
                ...(activePackage === pkg.name.toLowerCase() && {
                  ringColor: pkg.color,
                  backgroundColor: `${pkg.color}20`
                })
              }}
              onClick={() => setActivePackage(pkg.name.toLowerCase())}
            >
              <div className="text-center">
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: pkg.color }}
                ></div>
                <div className="font-medium text-gray-900">{pkg.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {((pkg.value / totalRevenue) * 100).toFixed(0)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagePerformance;