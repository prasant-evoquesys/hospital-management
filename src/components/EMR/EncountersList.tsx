import React, { useState } from 'react';
import { FileText, Plus, Search, User, Calendar, Stethoscope, Edit, Eye } from 'lucide-react';
import { mockEncounters, mockPatients } from '../../data/mockData';
import { Encounter } from '../../types';

const EncountersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);

  const filteredEncounters = mockEncounters.filter(encounter => {
    const patient = mockPatients.find(p => p.id === encounter.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      encounter.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      encounter.assessment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getStatusColor = (status: Encounter['status']) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'amended': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Electronic Medical Records</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Encounter</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search encounters by patient name, complaint, or assessment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
                  Visit Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visit Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chief Complaint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEncounters.map((encounter) => {
                const patient = mockPatients.find(p => p.id === encounter.patientId);
                return (
                  <tr 
                    key={encounter.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedEncounter(encounter)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {getPatientName(encounter.patientId)}
                          </div>
                          {patient && (
                            <div className="text-sm text-gray-500">{patient.mrn}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(encounter.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(encounter.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-sm text-gray-900">{encounter.visitType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {encounter.chiefComplaint}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(encounter.status)}`}>
                        {encounter.status}
                      </span>
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
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredEncounters.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No encounters found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Encounter Details Modal */}
      {selectedEncounter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Medical Record - {getPatientName(selectedEncounter.patientId)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEncounter(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Visit Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Visit Type:</span> <span className="capitalize">{selectedEncounter.visitType}</span></p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedEncounter.createdAt).toLocaleString()}</p>
                    <p><span className="font-medium">Status:</span> <span className={`capitalize px-2 py-1 rounded text-xs ${getStatusColor(selectedEncounter.status)}`}>{selectedEncounter.status}</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vital Signs</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {selectedEncounter.vitals.temperature && (
                      <p><span className="font-medium">Temp:</span> {selectedEncounter.vitals.temperature}°F</p>
                    )}
                    {selectedEncounter.vitals.bloodPressure && (
                      <p><span className="font-medium">BP:</span> {selectedEncounter.vitals.bloodPressure}</p>
                    )}
                    {selectedEncounter.vitals.heartRate && (
                      <p><span className="font-medium">HR:</span> {selectedEncounter.vitals.heartRate} bpm</p>
                    )}
                    {selectedEncounter.vitals.respiratoryRate && (
                      <p><span className="font-medium">RR:</span> {selectedEncounter.vitals.respiratoryRate} /min</p>
                    )}
                    {selectedEncounter.vitals.weight && (
                      <p><span className="font-medium">Weight:</span> {selectedEncounter.vitals.weight} lbs</p>
                    )}
                    {selectedEncounter.vitals.height && (
                      <p><span className="font-medium">Height:</span> {selectedEncounter.vitals.height} in</p>
                    )}
                    {selectedEncounter.vitals.oxygenSaturation && (
                      <p><span className="font-medium">SpO2:</span> {selectedEncounter.vitals.oxygenSaturation}%</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Chief Complaint</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedEncounter.chiefComplaint}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Assessment</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedEncounter.assessment}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Plan</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedEncounter.plan}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Diagnoses</h4>
                  {selectedEncounter.diagnoses.length > 0 ? (
                    <div className="space-y-2">
                      {selectedEncounter.diagnoses.map((diagnosis, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                          <p className="font-medium text-blue-900">{diagnosis.code}</p>
                          <p className="text-blue-700 text-sm">{diagnosis.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No diagnoses recorded</p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Medications</h4>
                  {selectedEncounter.medications.length > 0 ? (
                    <div className="space-y-2">
                      {selectedEncounter.medications.map((medication, index) => (
                        <div key={index} className="bg-green-50 p-3 rounded-lg">
                          <p className="font-medium text-green-900">{medication.name}</p>
                          <p className="text-green-700 text-sm">
                            {medication.dosage} - {medication.frequency} for {medication.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No medications prescribed</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Print Record
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Encounter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EncountersList;