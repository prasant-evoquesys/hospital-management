export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hospitalId: string;
  isActive: boolean;
  createdAt: string;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  HOSPITAL_ADMIN = 'hospital_admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
  CASHIER = 'cashier',
  LAB_TECH = 'lab_tech',
  PHARMACIST = 'pharmacist',
  PATIENT = 'patient'
}

export interface Patient {
  id: string;
  hospitalId: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  hospitalId: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  reason: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface Encounter {
  id: string;
  patientId: string;
  appointmentId?: string;
  providerId: string;
  visitType: 'routine' | 'urgent' | 'emergency' | 'follow_up';
  chiefComplaint: string;
  vitals: {
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    weight?: number;
    height?: number;
    oxygenSaturation?: number;
  };
  assessment: string;
  plan: string;
  diagnoses: Array<{
    code: string;
    description: string;
  }>;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  status: 'draft' | 'signed' | 'amended';
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  encounterId?: string;
  invoiceNumber: string;
  items: Array<{
    code: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  payments: Array<{
    id: string;
    amount: number;
    method: 'cash' | 'card' | 'insurance' | 'check';
    date: string;
    reference?: string;
  }>;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  quantityOnHand: number;
  reorderLevel: number;
  unitPrice: number;
  batchInfo?: Array<{
    batchNumber: string;
    expiryDate: string;
    quantity: number;
  }>;
  location: string;
  supplier: string;
  lastRestocked: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'revenue' | 'appointments' | 'patients' | 'inventory' | 'staff';
  data: any;
  generatedAt: string;
  generatedBy: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  before?: any;
  after?: any;
  timestamp: string;
  ipAddress: string;
}