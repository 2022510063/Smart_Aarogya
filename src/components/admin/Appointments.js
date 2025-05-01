import React, { useEffect, useState } from 'react';
import { getAppointments, deleteAppointmentById } from '../../utils/localStorage';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirmed) return;

    deleteAppointmentById(id);
    setAppointments(getAppointments());
  };

  return (
    <div className="container my-3">
      <h4 className="text-primary">Appointments</h4>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(appointment.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
