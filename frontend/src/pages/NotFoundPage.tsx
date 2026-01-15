// pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Camera, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-xl">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl animate-bounce">
            404
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </Link>
          
          <div className="text-sm text-gray-500">
            Or try these pages:
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/dashboard/calendar"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-medium">Calendar</div>
            </Link>
            <Link
              to="/dashboard/clients"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-medium">Clients</div>
            </Link>
            <Link
              to="/dashboard/portfolio"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <Camera className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-medium">Portfolio</div>
            </Link>
            <Link
              to="/dashboard/settings"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <Settings className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-medium">Settings</div>
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help?{' '}
              <a href="mailto:support@studiochakib.com" className="text-blue-600 hover:text-blue-800">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import missing icons
import { Settings, Users as Calendar, Users } from 'lucide-react';

export default NotFoundPage;