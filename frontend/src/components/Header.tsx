// components/Header.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Download, Filter, ChevronDown, Plus } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  filterYear: string;
  onYearChange: (year: string) => void;
  onViewChange: (view: string) => void;
  onExport: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeView,
  filterYear,
  onYearChange,
  onViewChange,
  onExport,
  onSearch,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const views = [
    { id: 'overview', label: 'Overview', path: '/dashboard/overview' },
    { id: 'revenue', label: 'Revenue', path: '/dashboard/analytics?tab=revenue' },
    { id: 'bookings', label: 'Bookings', path: '/dashboard/calendar' },
    { id: 'clients', label: 'Clients', path: '/dashboard/clients' },
  ];

  const years = ['2024', '2023', '2022'];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleQuickAdd = () => {
    // Show quick add modal based on current view
    if (location.pathname.includes('clients')) {
      navigate('/dashboard/clients?action=add');
    } else if (location.pathname.includes('calendar')) {
      navigate('/dashboard/calendar?action=add-event');
    } else {
      navigate('/dashboard/clients?action=add');
    }
  };

  return (
    <header className="mb-8">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {activeView === 'overview' && 'Dashboard Overview'}
            {activeView === 'calendar' && 'Event Calendar'}
            {activeView === 'clients' && 'Client Management'}
            {activeView === 'settings' && 'Settings'}
            {activeView === 'portfolio' && 'Portfolio'}
            {activeView === 'analytics' && 'Analytics'}
            {activeView === 'projects' && 'Projects'}
            {activeView === 'invoices' && 'Invoices'}
          </h1>
          <p className="text-gray-600">
            {activeView === 'overview' && 'Monitor your wedding photography business performance'}
            {activeView === 'calendar' && 'Schedule and manage all your events'}
            {activeView === 'clients' && 'Manage your wedding clients and relationships'}
            {activeView === 'settings' && 'Configure your studio settings and preferences'}
            {activeView === 'portfolio' && 'Showcase your best wedding photography work'}
            {activeView === 'analytics' && 'Detailed business analytics and insights'}
            {activeView === 'projects' && 'Manage ongoing photography projects'}
            {activeView === 'invoices' && 'Manage billing and invoices'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Quick Add Button (Contextual) */}
          {(activeView === 'clients' || activeView === 'calendar') && (
            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          )}
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                activeView === 'clients' ? 'Search clients...' :
                activeView === 'calendar' ? 'Search events...' :
                activeView === 'invoices' ? 'Search invoices...' :
                'Search...'
              }
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Notifications */}
          <button 
            onClick={() => navigate('/dashboard/settings?tab=notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <button 
            onClick={() => navigate('/dashboard/settings?tab=profile')}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-right">
              <span className="font-medium text-gray-900 block">Chakib</span>
              <span className="text-xs text-gray-500">Studio Owner</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Bottom Row - Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Year Select */}
          <div className="relative">
            <select
              className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={filterYear}
              onChange={(e) => onYearChange(e.target.value)}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          {/* View Tabs */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {views.map(view => (
              <button
                key={view.id}
                className={`px-4 py-2 font-medium transition-colors ${
                  location.pathname === view.path || 
                  (view.id === 'revenue' && activeView === 'analytics')
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => navigate(view.path)}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => console.log('Filters clicked')}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={onExport}
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;