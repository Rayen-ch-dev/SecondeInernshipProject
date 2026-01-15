// pages/ClientsPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Users, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  TrendingUp, 
  Plus, 
  Filter, 
  Search, 
  X,
  Calendar,
  Camera,
  Heart,
  Cake,
  Briefcase,
  ChevronRight,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

// Add Client Modal Component
const AddClientModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: any) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      status: 'active',
      totalSpent: 0,
      projects: 0,
      lastContact: new Date().toISOString().split('T')[0],
      notes: formData.notes,
      avatarColor: getRandomColor()
    };
    onSubmit(newClient);
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    });
  };

  const getRandomColor = () => {
    const colors = ['from-blue-500 to-purple-500', 'from-green-500 to-teal-500', 'from-orange-500 to-red-500', 'from-purple-500 to-pink-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
      
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Add New Client</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mt-1">Add a new client to your system</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="City, Street, etc."
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Any additional information about the client..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Edit Client Modal Component
const EditClientModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  client: any;
  onUpdate: (updatedClient: any) => void;
}> = ({ isOpen, onClose, client, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    notes: ''
  });

  // Initialize form data when client changes
  useEffect(() => {
    if (client) {
      const [firstName, ...lastNameParts] = client.name.split(' ');
      setFormData({
        firstName,
        lastName: lastNameParts.join(' '),
        email: client.email,
        phone: client.phone,
        address: client.address,
        status: client.status,
        notes: client.notes || ''
      });
    }
  }, [client]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedClient = {
      ...client,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      status: formData.status,
      notes: formData.notes
    };
    onUpdate(updatedClient);
    onClose();
  };

  if (!isOpen || !client) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
      
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${client.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Edit Client</h3>
                  <p className="text-gray-600 mt-1">Update client information</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="lead">Lead</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Spent (TND)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={client.totalSpent}
                    readOnly
                    className="w-full pl-10 px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">TND</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="City, Street, etc."
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Any additional information about the client..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Client Details Modal Component
const ClientDetailsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  client: any;
  onDelete: (clientId: number) => void;
  onEdit: (client: any) => void;
}> = ({ isOpen, onClose, client, onDelete, onEdit }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !client) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
      
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${client.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{client.name}</h3>
                  <p className="text-gray-600">Client ID: {client.id}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(client.status)}`}>
                <Star className="w-4 h-4" />
                <span className="capitalize">{client.status}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <Users className="w-4 h-4" />
                <span>{client.projects} projects</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium">{client.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium">{client.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Address</div>
                      <div className="font-medium">{client.address || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Last Contact</div>
                      <div className="font-medium">{client.lastContact}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Client Statistics</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Projects</div>
                      <div className="font-bold text-gray-900">{client.projects}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                      <div className="font-bold text-green-600">{client.totalSpent} TND</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Client Since</div>
                      <div className="font-medium">{client.createdAt || 'Recently added'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {client.notes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Notes</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{client.notes}</p>
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this client?')) {
                    onDelete(client.id);
                    onClose();
                  }
                }}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Delete Client
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    onEdit(client);
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit Client
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Import missing icon
import { DollarSign } from 'lucide-react';

// Helper function for status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'lead':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ClientsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<any>(null);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Amira Ben Ali',
      email: 'amira@example.com',
      phone: '+216 55 123 456',
      address: 'Tunis, Tunisia',
      status: 'active',
      totalSpent: 2200,
      projects: 3,
      lastContact: '2024-05-20',
      notes: 'Regular client, prefers portrait photography',
      avatarColor: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      name: 'Karim Ben Youssef',
      email: 'karim@example.com',
      phone: '+216 98 765 432',
      address: 'Sousse, Tunisia',
      status: 'active',
      totalSpent: 1800,
      projects: 2,
      lastContact: '2024-05-18',
      notes: 'Corporate client, needs regular product photos',
      avatarColor: 'from-green-500 to-teal-500'
    },
    {
      id: 3,
      name: 'Lina Trabelsi',
      email: 'lina@example.com',
      phone: '+216 71 234 567',
      address: 'Hammamet, Tunisia',
      status: 'lead',
      totalSpent: 1200,
      projects: 1,
      lastContact: '2024-05-15',
      notes: 'Interested in family photoshoot',
      avatarColor: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      name: 'Mohamed Slim',
      email: 'mohamed@example.com',
      phone: '+216 22 333 444',
      address: 'Nabeul, Tunisia',
      status: 'inactive',
      totalSpent: 800,
      projects: 1,
      lastContact: '2024-04-10',
      notes: 'Last project completed 2 months ago',
      avatarColor: 'from-purple-500 to-pink-500'
    },
  ]);

  const viewMode = searchParams.get('view') || 'list';

  const handleAddClient = () => {
    setShowAddClientModal(true);
  };

  const handleAddNewClient = (newClient: any) => {
    setClients([newClient, ...clients]);
  };

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleEditClient = (client: any) => {
    setClientToEdit(client);
    setShowEditModal(true);
  };

  const handleUpdateClient = (updatedClient: any) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
  };

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalSpent, 0);
  const averageSpent = totalRevenue / totalClients;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600">Manage your photography clients</p>
        </div>
        <button
          onClick={handleAddClient}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{totalClients}</div>
          <div className="text-sm text-gray-600">Total Clients</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{activeClients}</div>
          <div className="text-sm text-gray-600">Active Clients</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString()} TND</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{averageSpent.toFixed(0)} TND</div>
          <div className="text-sm text-gray-600">Avg. per Client</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Search clients by name or email..."
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSearchParams({ view: 'list' })}
          >
            List View
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSearchParams({ view: 'grid' })}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Clients View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <div 
              key={client.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${client.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {client.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{client.name}</div>
                    <div className="text-sm text-gray-600">{client.email}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-medium">{client.projects}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-bold text-green-600">{client.totalSpent} TND</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Contact</span>
                    <span className="font-medium">{client.lastContact}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(client.status)}`}>
                      <Star className="w-3 h-3" />
                      <span className="capitalize">{client.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(client)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditClient(client)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Client"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${client.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </div>
                      <div className="text-sm text-gray-500">{client.address}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{client.projects}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-green-600">{client.totalSpent} TND</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {client.lastContact}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(client.status)}`}>
                      <Star className="w-3 h-3" />
                      <span className="capitalize">{client.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleViewDetails(client)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditClient(client)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Client"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showAddClientModal && (
        <AddClientModal
          isOpen={showAddClientModal}
          onClose={() => setShowAddClientModal(false)}
          onSubmit={handleAddNewClient}
        />
      )}

      {showDetailsModal && (
        <ClientDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          client={selectedClient}
          onDelete={handleDeleteClient}
          onEdit={handleEditClient}
        />
      )}

      {showEditModal && (
        <EditClientModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          client={clientToEdit}
          onUpdate={handleUpdateClient}
        />
      )}
    </div>
  );
};

export default ClientsPage;