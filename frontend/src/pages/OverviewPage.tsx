// pages/OverviewPage.tsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import RevenueChart from '../components/charts/RevenueChart';
import SummaryCard from '../components/common/SummaryCard';
import PackagePerformance from '../components/charts/PackagePerformance';
import AlertCenter from '../components/common/AlertCenter';
import { DollarSign, Calendar, Camera, Star, TrendingUp, Users, ChevronRight } from 'lucide-react';

const OverviewPage: React.FC = () => {
  const context = useOutletContext<{ filterYear: string; searchQuery: string }>();
  const { filterYear, searchQuery } = context || { filterYear: '2024', searchQuery: '' };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Wedding Revenue"
          value="45,200 TND"
          icon={<DollarSign className="w-6 h-6" />}
          change="+18%"
          color="#00C851"
          trend="up"
          description="Year to date"
        />
        <SummaryCard
          title="Total Bookings"
          value="28 Events"
          icon={<Calendar className="w-6 h-6" />}
          change="+12%"
          color="#2E5BFF"
          trend="up"
          description="14 weddings this year"
        />
        <SummaryCard
          title="Upcoming Events"
          value="5 Events"
          icon={<Camera className="w-6 h-6" />}
          change="+5%"
          color="#FF9F43"
          trend="up"
          description="Next 30 days"
        />
        <SummaryCard
          title="Client Satisfaction"
          value="4.8/5 ★★★★★"
          icon={<Star className="w-6 h-6" />}
          change="+0.3"
          color="#8C9EB5"
          trend="up"
          description="Based on 47 reviews"
        />
      </div>

      {/* Revenue Chart - Full width */}
      <RevenueChart filterYear={filterYear} />

      {/* Package Performance - Full width (changed from 2-col layout) */}
      <PackagePerformance />

      {/* Alerts Row - Now 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCenter />
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Schedule New Event</div>
                  <div className="text-sm text-gray-600">Add wedding or engagement</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Generate Monthly Report</div>
                  <div className="text-sm text-gray-600">June 2024 performance</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Send Client Updates</div>
                  <div className="text-sm text-gray-600">Share latest photos</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;