// pages/CalendarPage.tsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, Filter } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Check if we're in "add event" mode
  const isAddMode = searchParams.get('action') === 'add-event';

  const handleAddEvent = (date?: string) => {
    setSearchParams({ action: 'add-event', date: date || new Date().toISOString().split('T')[0] });
  };

  const handleCloseAdd = () => {
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      {/* Add Event Modal */}
      {isAddMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
            {/* Add form here */}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={handleCloseAdd} className="px-4 py-2 border border-gray-300 rounded-lg">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Content */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Calendar</h2>
          <p className="text-gray-600">Schedule and manage all your events</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleAddEvent()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </div>
      
      {/* Calendar implementation... */}
      {/* ... rest of calendar content */}
    </div>
  );
};

export default CalendarPage;