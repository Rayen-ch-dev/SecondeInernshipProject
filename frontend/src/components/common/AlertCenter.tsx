// components/common/AlertCenter.tsx
import React, { useState } from 'react';
import { 
  AlertCircle, 
  Bell, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Camera, 
  Settings,
  X,
  ChevronRight,
  Filter
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'financial' | 'client' | 'equipment' | 'schedule' | 'system';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  action: string;
  date: string;
  read: boolean;
}

const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'financial',
      priority: 'high',
      title: 'Overdue Invoices',
      message: '3 invoices are overdue by more than 30 days',
      action: 'Send payment reminders',
      date: '2024-06-10',
      read: false
    },
    {
      id: '2',
      type: 'equipment',
      priority: 'medium',
      title: 'Camera Maintenance',
      message: 'Camera A7III requires sensor cleaning',
      action: 'Schedule maintenance',
      date: '2024-06-10',
      read: true
    },
    {
      id: '3',
      type: 'client',
      priority: 'medium',
      title: 'Wedding Package Selection',
      message: 'Client #312 has not selected their wedding package',
      action: 'Follow up via call',
      date: '2024-06-09',
      read: false
    },
    {
      id: '4',
      type: 'schedule',
      priority: 'low',
      title: 'Schedule Conflict',
      message: 'Two weddings scheduled for July 20th',
      action: 'Arrange second shooter',
      date: '2024-06-08',
      read: true
    },
    {
      id: '5',
      type: 'financial',
      priority: 'high',
      title: 'Deposit Received',
      message: 'New deposit received for September wedding',
      action: 'Confirm booking',
      date: '2024-06-08',
      read: true
    },
  ]);

  const [filter, setFilter] = useState<string>('all');
  const [showResolved, setShowResolved] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="w-5 h-5" />;
      case 'client':
        return <Users className="w-5 h-5" />;
      case 'equipment':
        return <Camera className="w-5 h-5" />;
      case 'schedule':
        return <Clock className="w-5 h-5" />;
      case 'system':
        return <Settings className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial':
        return 'bg-green-100 text-green-800';
      case 'client':
        return 'bg-purple-100 text-purple-800';
      case 'equipment':
        return 'bg-orange-100 text-orange-800';
      case 'schedule':
        return 'bg-blue-100 text-blue-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const resolveAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.read;
    if (filter === 'high') return alert.priority === 'high';
    if (filter === 'financial') return alert.type === 'financial';
    return alert.type === filter;
  });

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const highPriorityCount = alerts.filter(alert => alert.priority === 'high').length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Alert Center</h3>
              <p className="text-sm text-gray-600">Stay updated with important notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['all', 'unread', 'high', 'financial', 'client', 'equipment'].map(f => (
              <button
                key={f}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setShowResolved(!showResolved)}
          >
            <Filter className="w-4 h-4" />
            {showResolved ? 'Hide Resolved' : 'Show Resolved'}
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !alert.read ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className="flex gap-4">
                {/* Alert Icon */}
                <div className={`p-3 rounded-lg ${
                  alert.priority === 'high' ? 'bg-red-100' :
                  alert.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {getAlertIcon(alert.type)}
                </div>

                {/* Alert Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority} priority
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(alert.type)}`}>
                        {alert.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!alert.read && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{alert.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                        {alert.action}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-500">
                        {new Date(alert.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.read ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h4>
            <p className="text-gray-600">No new alerts at the moment.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {unreadCount} unread • {highPriorityCount} high priority
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </button>
            <button
              onClick={() => setAlerts([])}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCenter;