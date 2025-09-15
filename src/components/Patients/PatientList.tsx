import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, Phone, Mail } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { Patient } from '../../types';

interface PatientListProps {
  onPatientSelect?: (patient: Patient) => void;
  onAddPatient?: () => void;
}

const PatientList: React.FC<PatientListProps> = ({ onPatientSelect, onAddPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = mockPatients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    onPatientSelect?.(patient);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
        <button
          onClick={onAddPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients by name, MRN, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MRN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Insurance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedPatient?.id === patient.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handlePatientClick(patient)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {patient.firstName[0]}{patient.lastName[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Age: {new Date().getFullYear() - new Date(patient.dob).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.mrn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{patient.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(patient.dob).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="capitalize text-sm text-gray-900">{patient.gender}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.insuranceInfo?.provider || 'None'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No patients found matching your search criteria.</p>
          </div>
        )}
      </div>

      {selectedPatient && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {selectedPatient.firstName} {selectedPatient.lastName}</p>
                <p><span className="font-medium">MRN:</span> {selectedPatient.mrn}</p>
                <p><span className="font-medium">Date of Birth:</span> {new Date(selectedPatient.dob).toLocaleDateString()}</p>
                <p><span className="font-medium">Gender:</span> {selectedPatient.gender}</p>
                <p><span className="font-medium">Phone:</span> {selectedPatient.phone}</p>
                <p><span className="font-medium">Email:</span> {selectedPatient.email}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Address & Emergency Contact</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Address:</span> {selectedPatient.address.street}, {selectedPatient.address.city}, {selectedPatient.address.state} {selectedPatient.address.zipCode}</p>
                <p><span className="font-medium">Emergency Contact:</span> {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship})</p>
                <p><span className="font-medium">Emergency Phone:</span> {selectedPatient.emergencyContact.phone}</p>
                {selectedPatient.insuranceInfo && (
                  <>
                    <p><span className="font-medium">Insurance:</span> {selectedPatient.insuranceInfo.provider}</p>
                    <p><span className="font-medium">Policy #:</span> {selectedPatient.insuranceInfo.policyNumber}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;