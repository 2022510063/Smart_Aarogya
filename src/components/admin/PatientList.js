import React, { useState, useEffect } from 'react';
import { getPatients, deletePatientById } from '../../utils/localStorage';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this patient?');
    if (!confirmed) return;

    deletePatientById(id);
    setPatients(getPatients()); // Refresh list
  };

  return (
    <div className="container my-3">
      <h4 className="text-danger">All Patients</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(patient.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
