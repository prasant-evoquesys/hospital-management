import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@hospital.com',
    role: UserRole.DOCTOR,
    hospitalId: 'hosp1',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Mary Wilson',
    email: 'nurse@hospital.com',
    role: UserRole.NURSE,
    hospitalId: 'hosp1',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'receptionist@hospital.com',
    role: UserRole.RECEPTIONIST,
    hospitalId: 'hosp1',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'cashier@hospital.com',
    role: UserRole.CASHIER,
    hospitalId: 'hosp1',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: UserRole.HOSPITAL_ADMIN,
    hospitalId: 'hosp1',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('hospital_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};