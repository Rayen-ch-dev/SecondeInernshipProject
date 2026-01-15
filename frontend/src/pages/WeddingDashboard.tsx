import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Camera,
  Package,
  MapPin,
  AlertCircle,
  Star,
  Download,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  BarChart3,
  Home,
  Settings,
  Bell,
  Search,
  User
} from 'lucide-react';

// ========== TYPES ==========
interface WeddingEvent {
  id: string;
  clientName: string;
  date: string;
  type: 'wedding' | 'engagement' | 'corporate';
  package: 'platinum' | 'gold' | 'silver';
  venue: string;
  revenue: number;
  status: 'completed' | 'upcoming' | 'cancelled';
  team: string[];
  preparation: PreparationTask[];
}

interface PreparationTask {
  task: string;
  dueDate: string;
  completed: boolean;
}

interface RevenueData {
  month: string;
  weddingRevenue: number;
  otherEvents: number;
  weddingsCount: number;
}

interface PackageData {
  name: string;
  value: number;
  count: number;
  color: string;
}

interface VenueData {
  name: string;
  weddings: number;
  revenue: number;
  rating: number;
}

interface Alert {
  id: string;
  type: 'financial' | 'client' | 'equipment' | 'schedule';
  priority: 'high' | 'medium' | 'low';
  message: string;
  action: string;
  date: string;
}

interface TeamMember {
  name: string;
  role: string;
  status: 'active' | 'available' | 'busy';
  workload: number;
  upcomingEvents: number;
}

// ========== MOCK DATA ==========
const mockRevenueData: RevenueData[] = [
  { month: 'Jan', weddingRevenue: 1200, otherEvents: 800, weddingsCount: 1 },
  { month: 'Feb', weddingRevenue: 800, otherEvents: 600, weddingsCount: 1 },
  { month: 'Mar', weddingRevenue: 4500, otherEvents: 1200, weddingsCount: 3 },
  { month: 'Apr', weddingRevenue: 5200, otherEvents: 1500, weddingsCount: 4 },
  { month: 'May', weddingRevenue: 8200, otherEvents: 1000, weddingsCount: 6 },
  { month: 'Jun', weddingRevenue: 6800, otherEvents: 800, weddingsCount: 5 },
  { month: 'Jul', weddingRevenue: 4200, otherEvents: 500, weddingsCount: 3 },
  { month: 'Aug', weddingRevenue: 3800, otherEvents: 400, weddingsCount: 3 },
  { month: 'Sep', weddingRevenue: 6500, otherEvents: 1200, weddingsCount: 5 },
  { month: 'Oct', weddingRevenue: 3200, otherEvents: 900, weddingsCount: 2 },
  { month: 'Nov', weddingRevenue: 2800, otherEvents: 700, weddingsCount: 2 },
  { month: 'Dec', weddingRevenue: 1500, otherEvents: 600, weddingsCount: 1 },
];

const mockPackages: PackageData[] = [
  { name: 'Platinum', value: 28000, count: 14, color: '#2E5BFF' },
  { name: 'Gold', value: 15000, count: 10, color: '#00C851' },
  { name: 'Silver', value: 4000, count: 4, color: '#FF9F43' },
];

const mockVenues: VenueData[] = [
  { name: 'Hotel Dar Said', weddings: 8, revenue: 12800, rating: 4.9 },
  { name: 'La Marsa Beach Club', weddings: 5, revenue: 7500, rating: 4.7 },
  { name: 'Gammarth Palace', weddings: 4, revenue: 6400, rating: 4.8 },
  { name: 'Sidi Bou Said Villa', weddings: 3, revenue: 4800, rating: 4.9 },
  { name: 'Hammamet Golf Club', weddings: 2, revenue: 3000, rating: 4.6 },
];

const mockAlerts: Alert[] = [
  { 
    id: '1', 
    type: 'financial', 
    priority: 'high', 
    message: '3 invoices overdue > 30 days',
    action: 'Send reminders now',
    date: '2024-06-10'
  },
  { 
    id: '2', 
    type: 'equipment', 
    priority: 'medium', 
    message: 'Camera A7III needs sensor cleaning',
    action: 'Schedule maintenance',
    date: '2024-06-10'
  },
  { 
    id: '3', 
    type: 'client', 
    priority: 'medium', 
    message: 'Wedding client #312 hasn\'t chosen package',
    action: 'Call to discuss',
    date: '2024-06-09'
  },
  { 
    id: '4', 
    type: 'schedule', 
    priority: 'low', 
    message: 'Two weddings scheduled same day (July 20)',
    action: 'Arrange second shooter',
    date: '2024-06-08'
  },
];

const mockUpcomingEvents: WeddingEvent[] = [
  {
    id: '1',
    clientName: 'Amira & Karim',
    date: '2024-06-15',
    type: 'wedding',
    package: 'platinum',
    venue: 'Hotel Dar Said, Sidi Bou Said',
    revenue: 2200,
    status: 'upcoming',
    team: ['Chakib', 'Sami'],
    preparation: [
      { task: 'Final meeting', dueDate: '2024-06-10', completed: true },
      { task: 'Equipment check', dueDate: '2024-06-12', completed: false },
      { task: 'Assistant brief', dueDate: '2024-06-14', completed: false },
    ]
  },
  {
    id: '2',
    clientName: 'Leila Family',
    date: '2024-06-22',
    type: 'engagement',
    package: 'gold',
    venue: 'Family Home, La Marsa',
    revenue: 1500,
    status: 'upcoming',
    team: ['Chakib'],
    preparation: [
      { task: 'Venue visit', dueDate: '2024-06-18', completed: false },
      { task: 'Client questionnaire', dueDate: '2024-06-20', completed: false },
    ]
  },
  {
    id: '3',
    clientName: 'Youssef & Sarah',
    date: '2024-07-05',
    type: 'wedding',
    package: 'platinum',
    venue: 'Gammarth Palace',
    revenue: 2500,
    status: 'upcoming',
    team: ['Chakib', 'Sami', 'Leila'],
    preparation: [
      { task: 'Initial consultation', dueDate: '2024-06-15', completed: false },
      { task: 'Venue scouting', dueDate: '2024-06-20', completed: false },
    ]
  },
];

const mockTeam: TeamMember[] = [
  { name: 'Chakib', role: 'Lead Photographer', status: 'active', workload: 85, upcomingEvents: 3 },
  { name: 'Sami', role: 'Second Shooter', status: 'available', workload: 60, upcomingEvents: 2 },
  { name: 'Leila', role: 'Editor', status: 'busy', workload: 90, upcomingEvents: 1 },
];

// ========== COMPONENTS ==========

// 1. Summary Card Component
const SummaryCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  color: string;
}> = ({ title, value, icon, change, color }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <div style={{ color: color }}>{icon}</div>
      </div>
      <span className="text-gray-600 font-medium">{title}</span>
    </div>
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      {change && (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          change.includes('+') 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {change}
        </span>
      )}
    </div>
  </div>
);

// 2. Revenue Chart Component
const RevenueChart: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-gray-900">Wedding Revenue Trend 2024</h3>
      <div className="flex gap-4">
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
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={mockRevenueData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`${value} TND`, 'Revenue']}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Area 
          type="monotone" 
          dataKey="weddingRevenue" 
          stroke="#2E5BFF" 
          fill="#2E5BFF" 
          fillOpacity={0.1}
          name="Wedding Revenue"
          strokeWidth={2}
        />
        <Area 
          type="monotone" 
          dataKey="otherEvents" 
          stroke="#8C9EB5" 
          fill="#8C9EB5" 
          fillOpacity={0.1}
          name="Other Events"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// 3. Package Performance Component
const PackagePerformance: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Package Performance</h3>
    <div className="space-y-4">
      {mockPackages.map((pkg) => (
        <div key={pkg.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: pkg.color }}
              ></div>
              <span className="font-medium text-gray-900">{pkg.name}</span>
            </div>
            <span className="text-sm text-gray-500">{pkg.count} weddings</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${(pkg.value / 47000) * 100}%`,
                backgroundColor: pkg.color
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Revenue</span>
            <span className="font-semibold text-gray-900">{pkg.value.toLocaleString()} TND</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 4. Venue Analytics Component
const VenueAnalytics: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Wedding Venues</h3>
    <div className="space-y-4">
      {mockVenues.map((venue) => (
        <div key={venue.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div>
            <div className="font-medium text-gray-900">{venue.name}</div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span>{venue.weddings} weddings</span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {venue.rating}
              </span>
            </div>
          </div>
          <div className="font-bold text-blue-600">{venue.revenue.toLocaleString()} TND</div>
        </div>
      ))}
    </div>
  </div>
);

// 5. Alert Center Component
const AlertCenter: React.FC = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Priority';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Priority Alerts</h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {mockAlerts.length} alerts
        </span>
      </div>
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${
              alert.priority === 'high' 
                ? 'bg-red-50 border-red-500' 
                : alert.priority === 'medium'
                ? 'bg-orange-50 border-orange-500'
                : 'bg-blue-50 border-blue-500'
            }`}
          >
            <div className={`w-2 h-10 rounded ${getPriorityColor(alert.priority)}`}></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  alert.priority === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : alert.priority === 'medium'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {getPriorityText(alert.priority)}
                </span>
                <span className="text-sm text-gray-500">{alert.date}</span>
              </div>
              <p className="font-medium text-gray-900 mb-1">{alert.message}</p>
              <p className="text-sm text-gray-600">{alert.action}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. Upcoming Events Component
const UpcomingEvents: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'upcoming': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPackageColor = (pkg: string) => {
    switch (pkg) {
      case 'platinum': return 'bg-blue-100 text-blue-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events (Next 30 Days)</h3>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>
      <div className="space-y-4">
        {mockUpcomingEvents.map((event) => (
          <div key={event.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-900">{event.clientName}</h4>
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getPackageColor(event.package)}`}>
                      {event.package.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.team.join(', ')}</span>
                    </div>
                    <div className="text-orange-600 font-medium">
                      {event.preparation.filter(t => !t.completed).length} tasks pending
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{event.revenue} TND</div>
                <div className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. Team Workload Component
const TeamWorkload: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Workload</h3>
    <div className="space-y-6">
      {mockTeam.map((member) => (
        <div key={member.name} className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-500">{member.role}</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              member.status === 'active' 
                ? 'bg-green-100 text-green-800'
                : member.status === 'busy'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {member.status}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Workload</span>
              <span className="font-medium text-gray-900">{member.workload}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  member.workload > 80 
                    ? 'bg-red-500'
                    : member.workload > 60
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${member.workload}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              {member.upcomingEvents} upcoming events
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 8. Seasonality Heatmap Component
const SeasonalityHeatmap: React.FC = () => {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Generate mock booked days (some booked, some available)
  const isBooked = (dayIndex: number) => {
    const bookedDays = [0, 5, 6, 7, 12, 13, 14, 19, 20, 26, 27, 28, 34];
    return bookedDays.includes(dayIndex);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Density - Summer 2024</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map((day) => (
            <div key={day} className="text-center text-sm text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, index) => {
            const booked = isBooked(index);
            return (
              <div
                key={index}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all hover:scale-105 cursor-pointer ${
                  booked
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={booked ? 'Wedding booked' : 'Available'}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-600"></div>
            <span className="text-sm text-gray-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. Quick Stats Component
const QuickStats: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Avg. Wedding Value</div>
        <div className="text-2xl font-bold text-gray-900">1,615 TND</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
        <div className="text-2xl font-bold text-green-600">42%</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Repeat Clients</div>
        <div className="text-2xl font-bold text-gray-900">8</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Peak Month</div>
        <div className="text-2xl font-bold text-blue-600">May (6)</div>
      </div>
    </div>
  </div>
);

// ========== MAIN DASHBOARD COMPONENT ==========
const WeddingDashboard: React.FC = () => {
  const [filterYear, setFilterYear] = useState('2024');
  const [activeView, setActiveView] = useState('overview');

  // Calculate summary statistics
  const totalRevenue = mockRevenueData.reduce((sum, month) => sum + month.weddingRevenue, 0);
  const totalWeddings = mockRevenueData.reduce((sum, month) => sum + month.weddingsCount, 0);
  const upcomingCount = mockUpcomingEvents.length;
  const completedWeddings = mockRevenueData.reduce((sum, month) => sum + month.weddingsCount, 0) - upcomingCount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Studio Chakib</h1>
              <p className="text-sm text-gray-500">Wedding Intelligence</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeView === 'overview'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveView('overview')}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeView === 'calendar'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveView('calendar')}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Calendar</span>
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeView === 'analytics'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveView('analytics')}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeView === 'clients'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveView('clients')}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Clients</span>
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeView === 'settings'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveView('settings')}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </nav>
          
     
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Top Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Wedding Intelligence Dashboard</h1>
              <p className="text-gray-600">Monitor your wedding photography business performance</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search weddings, clients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Chakib</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-l-lg">Overview</button>
                <button className="px-4 py-2 hover:bg-gray-100">Revenue</button>
                <button className="px-4 py-2 hover:bg-gray-100">Bookings</button>
                <button className="px-4 py-2 hover:bg-gray-100 rounded-r-lg">Clients</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="Wedding Revenue"
            value={`${totalRevenue.toLocaleString()} TND`}
            icon={<DollarSign className="w-6 h-6" />}
            change="+18%"
            color="#00C851"
          />
          <SummaryCard
            title="Total Weddings"
            value={`${totalWeddings} Events`}
            icon={<Calendar className="w-6 h-6" />}
            change="+12%"
            color="#2E5BFF"
          />
          <SummaryCard
            title="Upcoming Events"
            value={`${upcomingCount} Next 30 Days`}
            icon={<Camera className="w-6 h-6" />}
            iconColor="#FF9F43"
            color="#FF9F43"
          />
          <SummaryCard
            title="Client Satisfaction"
            value="4.8/5 ★★★★★"
            icon={<Star className="w-6 h-6" />}
            change="+0.3"
            color="#8C9EB5"
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="space-y-6">
            <PackagePerformance />
            <QuickStats />
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AlertCenter />
          </div>
          <div>
            <TeamWorkload />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <UpcomingEvents />
          </div>
          <div className="space-y-6">
            <SeasonalityHeatmap />
            <VenueAnalytics />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span>© 2024 Studio Chakib. Wedding Intelligence Dashboard v2.0</span>
              <span className="mx-2">•</span>
              <span>Last updated: Today, 10:30 AM</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-blue-600">Help</button>
              <button className="hover:text-blue-600">Documentation</button>
              <button className="hover:text-blue-600">API</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WeddingDashboard;