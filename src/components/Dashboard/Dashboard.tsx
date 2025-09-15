import React from 'react';
import { Users, Calendar, FileText, DollarSign, TrendingUp, Clock, Package, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockPatients, mockAppointments, mockInvoices, mockInventory } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Total Patients',
      value: mockPatients.length.toString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: "Today's Appointments",
      value: mockAppointments.filter(apt => 
        new Date(apt.scheduledAt).toDateString() === new Date().toDateString()
      ).length.toString(),
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'increase'
    },
    {
      name: 'Pending Invoices',
      value: mockInvoices.filter(inv => inv.status !== 'paid').length.toString(),
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '-8%',
      changeType: 'decrease'
    },
    {
      name: 'Low Stock Items',
      value: mockInventory.filter(item => item.quantityOnHand <= item.reorderLevel).length.toString(),
      icon: Package,
      color: 'bg-red-500',
      change: '+2',
      changeType: 'increase'
    }
  ];

  const recentAppointments = mockAppointments
    .filter(apt => new Date(apt.scheduledAt) >= new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5);

  const lowStockItems = mockInventory.filter(item => item.quantityOnHand <= item.reorderLevel);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'checked_in': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            </div>
          </div>
          <div className="p-6">
            {recentAppointments.length > 0 ? (
              <div className="space-y-4">
                {recentAppointments.map((appointment) => {
                  const patient = mockPatients.find(p => p.id === appointment.patientId);
                  return (
                    <div key={appointment.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient'}
                        </p>
                        <p className="text-sm text-gray-500">{appointment.reason}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(appointment.scheduledAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
            </div>
          </div>
          <div className="p-6">
            {lowStockItems.length > 0 ? (
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Package className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-xs text-gray-400">Location: {item.location}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">{item.quantityOnHand}</p>
                        <p className="text-xs text-gray-500">in stock</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">All items are well stocked</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-blue-900">Add Patient</span>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-900">Schedule Appointment</span>
          </button>
          <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <FileText className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-yellow-900">Create Record</span>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-purple-900">Generate Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;