// pages/ClientDetailsPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Camera, Edit, Trash2 } from 'lucide-react';

const ClientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In real app, fetch client data based on ID
  const client = {
    id: id,
    name: 'Amira Ben Ali',
    email: 'amira@example.com',
    phone: '+216 12 345 678',
    address: 'Tunis, Tunisia',
    weddingDate: '2024-06-15',
    package: 'Platinum',
    totalSpent: 2200,
    events: ['Wedding', 'Engagement'],
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/clients')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </button>

      {/* Client Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {client.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {client.address}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Client Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Wedding Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Wedding Date</span>
              <span className="font-medium">{client.weddingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Package</span>
              <span className="font-medium">{client.package}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Spent</span>
              <span className="font-bold text-blue-600">{client.totalSpent} TND</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Events</h3>
          <div className="space-y-3">
            {client.events.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <span>{event}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Photos
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;