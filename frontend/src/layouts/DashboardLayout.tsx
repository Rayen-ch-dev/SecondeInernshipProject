// layouts/DashboardLayout.tsx
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract current view from path (e.g., "/dashboard/overview" -> "overview")
  const currentPath = location.pathname.split('/').pop() || 'overview';
  const [filterYear, setFilterYear] = useState('2024');
  const [searchQuery, setSearchQuery] = useState('');

  const handleYearChange = (year: string) => {
    setFilterYear(year);
    console.log('Year changed to:', year);
  };

  const handleViewChange = (view: string) => {
    navigate(`/dashboard/${view}`);
  };

  const handleExport = () => {
    console.log('Exporting data...');
    // Implement export logic
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeView={currentPath} onViewChange={handleViewChange} />
      
      <div className="ml-64 p-6">
        <Header
          activeView={currentPath}
          filterYear={filterYear}
          onYearChange={handleYearChange}
          onViewChange={handleViewChange}
          onExport={handleExport}
          onSearch={handleSearch}
        />
        
        <main className="animate-fade-in">
          <Outlet context={{ filterYear, searchQuery }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;