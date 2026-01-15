// pages/SettingsPage.tsx
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  CreditCard,
  Users,
  Globe,
  Database,
  HelpCircle,
  Save,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    studioName: 'Studio Chakib',
    ownerName: 'Chakib Ben Amor',
    email: 'contact@studiochakib.com',
    phone: '+216 12 345 678',
    address: 'Beni Khiar, Nabeul, Tunisia',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    newBookings: true,
    paymentReminders: true,
    newsletter: false,
    marketing: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field: string) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    console.log('Saving settings:', formData, notifications);
    // Implement save logic here
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your studio settings and preferences</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <div className="px-6">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 flex items-center gap-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                      isActive
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Studio Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <SettingsIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.studioName}
                        onChange={(e) => handleInputChange('studioName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Owner Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Studio Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Security Tip</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Use a strong password with at least 8 characters including uppercase, lowercase, numbers, and symbols.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-600">
                        {key === 'emailUpdates' && 'Receive email updates about your account'}
                        {key === 'newBookings' && 'Get notified about new bookings'}
                        {key === 'paymentReminders' && 'Reminders for upcoming payments'}
                        {key === 'newsletter' && 'Monthly newsletter with photography tips'}
                        {key === 'marketing' && 'Promotional offers and updates'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Billing & Subscription</h3>
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold">Premium Plan</div>
                    <div className="text-blue-100">Full access to all features</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">49 TND</div>
                    <div className="text-blue-100">per month</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Unlimited Clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Advanced Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Custom Branding</span>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Upgrade Plan
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Payment Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-500 rounded"></div>
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-sm text-gray-600">Expires 12/2025</div>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors">
                    + Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Management</h3>
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            C
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Chakib Ben Amor</div>
                            <div className="text-sm text-gray-600">chakib@studiochakib.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Owner
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Add Team Member
              </button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="font-medium text-gray-900">Dark Mode</div>
                      <div className="text-sm text-gray-600">Switch to dark theme</div>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only" />
                      <div className="block bg-gray-200 w-12 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </label>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">Language</div>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>English</option>
                    <option>Français</option>
                    <option>العربية</option>
                  </select>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">Time Zone</div>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>(GMT+1) Tunis, Tunisia</option>
                    <option>(GMT+2) Cairo, Egypt</option>
                    <option>(GMT+0) London, UK</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button className="text-gray-600 hover:text-gray-900">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;