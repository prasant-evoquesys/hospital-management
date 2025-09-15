import React from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  Shield,
  Stethoscope,
  ClipboardList,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    ];

    const roleSpecificItems: Record<UserRole, Array<{id: string, label: string, icon: any}>> = {
      [UserRole.SUPER_ADMIN]: [
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'encounters', label: 'Medical Records', icon: FileText },
        { id: 'billing', label: 'Billing', icon: DollarSign },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
      [UserRole.HOSPITAL_ADMIN]: [
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'encounters', label: 'Medical Records', icon: FileText },
        { id: 'billing', label: 'Billing', icon: DollarSign },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
      [UserRole.DOCTOR]: [
        { id: 'appointments', label: 'My Appointments', icon: Calendar },
        { id: 'encounters', label: 'Patient Records', icon: Stethoscope },
        { id: 'patients', label: 'Patients', icon: Users },
      ],
      [UserRole.NURSE]: [
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'encounters', label: 'Patient Care', icon: ClipboardList },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'inventory', label: 'Supplies', icon: Package },
      ],
      [UserRole.RECEPTIONIST]: [
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'billing', label: 'Billing', icon: DollarSign },
      ],
      [UserRole.CASHIER]: [
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
      ],
      [UserRole.LAB_TECH]: [
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'inventory', label: 'Lab Supplies', icon: Package },
      ],
      [UserRole.PHARMACIST]: [
        { id: 'inventory', label: 'Pharmacy', icon: Package },
        { id: 'patients', label: 'Patients', icon: Users },
      ],
      [UserRole.PATIENT]: [
        { id: 'appointments', label: 'My Appointments', icon: Calendar },
        { id: 'encounters', label: 'My Records', icon: FileText },
        { id: 'billing', label: 'My Bills', icon: DollarSign },
      ],
    };

    const items = user ? [...baseItems, ...roleSpecificItems[user.role]] : baseItems;
    return items;
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Hospital ERP</h1>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;