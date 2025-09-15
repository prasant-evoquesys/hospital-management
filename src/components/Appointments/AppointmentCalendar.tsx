import React, { useState } from 'react';
import { Calendar, Clock, Plus, User, MapPin, Phone } from 'lucide-react';
import { mockAppointments, mockPatients } from '../../data/mockData';
import { Appointment } from '../../types';

const AppointmentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const getAppointmentsForDate = (date: string) => {
    return mockAppointments.filter(apt => 
      apt.scheduledAt.split('T')[0] === date
    ).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  };

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'checked_in': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'no_show': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const appointmentsForDate = getAppointmentsForDate(selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['day', 'week', 'month'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-sm font-medium capitalize ${
                  viewMode === mode 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Sidebar */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Legend</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
                <span>Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                <span>Checked In</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                <span>Cancelled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Schedule */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {appointmentsForDate.length} appointments
              </span>
            </div>
          </div>

          <div className="p-6">
            {appointmentsForDate.length > 0 ? (
              <div className="space-y-4">
                {appointmentsForDate.map((appointment) => {
                  const patient = mockPatients.find(p => p.id === appointment.patientId);
                  return (
                    <div 
                      key={appointment.id} 
                      className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${getStatusColor(appointment.status)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">
                                {new Date(appointment.scheduledAt).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                            <span className="text-gray-500">•</span>
                            <span className="text-sm text-gray-600">{appointment.duration} min</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {getPatientName(appointment.patientId)}
                            </span>
                            {patient && (
                              <span className="text-sm text-gray-500">({patient.mrn})</span>
                            )}
                          </div>

                          <p className="text-sm text-gray-700 mb-2">{appointment.reason}</p>
                          
                          {patient && (
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{patient.phone}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{patient.address.city}, {patient.address.state}</span>
                              </div>
                            </div>
                          )}

                          {appointment.notes && (
                            <div className="mt-2 p-2 bg-white bg-opacity-50 rounded text-sm">
                              <span className="font-medium">Notes: </span>
                              {appointment.notes}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {appointment.status.replace('_', ' ').toUpperCase()}
                          </span>
                          
                          <div className="flex space-x-1">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Edit
                            </button>
                            <span className="text-gray-300">•</span>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments scheduled for this date.</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                  Schedule an appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;