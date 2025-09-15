import { Patient, Appointment, Encounter, Invoice, InventoryItem } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'pat1',
    hospitalId: 'hosp1',
    mrn: 'MRN001',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1980-05-15',
    gender: 'male',
    phone: '+1-555-0123',
    email: 'john.doe@email.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1-555-0124'
    },
    insuranceInfo: {
      provider: 'BlueCross BlueShield',
      policyNumber: 'BC123456789',
      groupNumber: 'GRP001'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'pat2',
    hospitalId: 'hosp1',
    mrn: 'MRN002',
    firstName: 'Sarah',
    lastName: 'Smith',
    dob: '1975-08-22',
    gender: 'female',
    phone: '+1-555-0125',
    email: 'sarah.smith@email.com',
    address: {
      street: '456 Oak Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201'
    },
    emergencyContact: {
      name: 'Michael Smith',
      relationship: 'Husband',
      phone: '+1-555-0126'
    },
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  },
  {
    id: 'pat3',
    hospitalId: 'hosp1',
    mrn: 'MRN003',
    firstName: 'Robert',
    lastName: 'Johnson',
    dob: '1990-12-10',
    gender: 'male',
    phone: '+1-555-0127',
    email: 'robert.johnson@email.com',
    address: {
      street: '789 Pine Rd',
      city: 'Queens',
      state: 'NY',
      zipCode: '11101'
    },
    emergencyContact: {
      name: 'Linda Johnson',
      relationship: 'Mother',
      phone: '+1-555-0128'
    },
    createdAt: '2024-01-17T14:15:00Z',
    updatedAt: '2024-01-17T14:15:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    hospitalId: 'hosp1',
    patientId: 'pat1',
    doctorId: '1',
    scheduledAt: '2024-12-27T10:00:00Z',
    duration: 30,
    status: 'scheduled',
    reason: 'Annual checkup',
    createdBy: '3',
    createdAt: '2024-12-26T15:00:00Z'
  },
  {
    id: 'apt2',
    hospitalId: 'hosp1',
    patientId: 'pat2',
    doctorId: '1',
    scheduledAt: '2024-12-27T10:30:00Z',
    duration: 45,
    status: 'checked_in',
    reason: 'Follow-up consultation',
    notes: 'Patient has been experiencing headaches',
    createdBy: '3',
    createdAt: '2024-12-26T16:30:00Z'
  },
  {
    id: 'apt3',
    hospitalId: 'hosp1',
    patientId: 'pat3',
    doctorId: '1',
    scheduledAt: '2024-12-27T11:15:00Z',
    duration: 30,
    status: 'scheduled',
    reason: 'Vaccination',
    createdBy: '3',
    createdAt: '2024-12-26T14:20:00Z'
  }
];

export const mockEncounters: Encounter[] = [
  {
    id: 'enc1',
    patientId: 'pat2',
    appointmentId: 'apt2',
    providerId: '1',
    visitType: 'follow_up',
    chiefComplaint: 'Recurring headaches for the past week',
    vitals: {
      temperature: 98.6,
      bloodPressure: '120/80',
      heartRate: 72,
      respiratoryRate: 16,
      weight: 150,
      height: 65,
      oxygenSaturation: 99
    },
    assessment: 'Tension headaches likely due to stress and poor sleep habits',
    plan: 'Recommend stress management techniques, regular sleep schedule, and follow-up in 2 weeks',
    diagnoses: [
      {
        code: 'G44.209',
        description: 'Tension-type headache, unspecified, not intractable'
      }
    ],
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '200mg',
        frequency: 'Every 6-8 hours as needed',
        duration: '1 week'
      }
    ],
    status: 'signed',
    createdAt: '2024-12-27T10:35:00Z',
    updatedAt: '2024-12-27T11:15:00Z'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    patientId: 'pat2',
    encounterId: 'enc1',
    invoiceNumber: 'INV-2024-001',
    items: [
      {
        code: '99213',
        description: 'Office visit - established patient',
        quantity: 1,
        unitPrice: 150,
        total: 150
      },
      {
        code: 'LAB001',
        description: 'Blood pressure check',
        quantity: 1,
        unitPrice: 25,
        total: 25
      }
    ],
    subtotal: 175,
    tax: 14,
    discount: 0,
    total: 189,
    status: 'sent',
    payments: [],
    dueDate: '2025-01-26T00:00:00Z',
    createdAt: '2024-12-27T11:20:00Z',
    updatedAt: '2024-12-27T11:20:00Z'
  },
  {
    id: 'inv2',
    patientId: 'pat1',
    invoiceNumber: 'INV-2024-002',
    items: [
      {
        code: '99395',
        description: 'Annual physical exam',
        quantity: 1,
        unitPrice: 200,
        total: 200
      }
    ],
    subtotal: 200,
    tax: 16,
    discount: 20,
    total: 196,
    status: 'paid',
    payments: [
      {
        id: 'pay1',
        amount: 196,
        method: 'card',
        date: '2024-12-26T14:00:00Z',
        reference: 'CC-789123'
      }
    ],
    dueDate: '2025-01-25T00:00:00Z',
    createdAt: '2024-12-26T13:00:00Z',
    updatedAt: '2024-12-26T14:00:00Z'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'inv_item1',
    sku: 'MED001',
    name: 'Ibuprofen 200mg',
    description: 'Pain reliever and anti-inflammatory',
    category: 'Medication',
    quantityOnHand: 500,
    reorderLevel: 100,
    unitPrice: 0.15,
    batchInfo: [
      {
        batchNumber: 'BATCH001',
        expiryDate: '2025-06-30',
        quantity: 300
      },
      {
        batchNumber: 'BATCH002',
        expiryDate: '2025-08-15',
        quantity: 200
      }
    ],
    location: 'Pharmacy - A1',
    supplier: 'MedSupply Inc.',
    lastRestocked: '2024-12-20T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z'
  },
  {
    id: 'inv_item2',
    sku: 'SUP001',
    name: 'Disposable Gloves (Box)',
    description: 'Latex-free examination gloves, size M',
    category: 'Medical Supplies',
    quantityOnHand: 50,
    reorderLevel: 20,
    unitPrice: 12.50,
    location: 'Supply Room - B2',
    supplier: 'Medical Supply Co.',
    lastRestocked: '2024-12-15T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z'
  },
  {
    id: 'inv_item3',
    sku: 'EQP001',
    name: 'Digital Thermometer',
    description: 'Non-contact infrared thermometer',
    category: 'Equipment',
    quantityOnHand: 15,
    reorderLevel: 5,
    unitPrice: 45.99,
    location: 'Equipment Room - C1',
    supplier: 'MedTech Solutions',
    lastRestocked: '2024-12-10T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z'
  }
];