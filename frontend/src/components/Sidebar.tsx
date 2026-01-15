// components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  Camera,
  ChevronRight,
  Briefcase,
  FileText,
  Shield,
  CreditCard,
  Image,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: Home, path: '/dashboard/overview', color: 'blue' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/dashboard/calendar', color: 'green' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics', color: 'purple' },
    { id: 'clients', label: 'Clients', icon: Users, path: '/dashboard/clients', color: 'orange' },
    { id: 'portfolio', label: 'Portfolio', icon: Camera, path: '/dashboard/portfolio', color: 'red' },
    { id: 'projects', label: 'Projects', icon: Briefcase, path: '/dashboard/projects', color: 'indigo' },
    { id: 'invoices', label: 'Invoices', icon: FileText, path: '/dashboard/invoices', color: 'teal' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings', color: 'gray' },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      orange: 'bg-orange-100 text-orange-700',
      red: 'bg-red-100 text-red-700',
      indigo: 'bg-indigo-100 text-indigo-700',
      teal: 'bg-teal-100 text-teal-700',
      gray: 'bg-gray-100 text-gray-700',
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo with Link to Dashboard */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard/overview" className="block hover:bg-gray-50 transition-colors p-2 -m-2 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">Studio Chakib</h1>
              <p className="text-sm text-gray-500">Wedding Intelligence</p>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Navigation - Takes available space */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(item.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>
        
        {/* Upgrade Banner - Added with margin */}
     
      </div>
      
      {/* User Profile Footer - Removed absolute, added padding */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <Link 
            to="/dashboard/settings?tab=profile" 
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-1"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Chakib Ben Amor</div>
              <div className="text-sm text-gray-500">Studio Owner</div>
            </div>
          </Link>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;