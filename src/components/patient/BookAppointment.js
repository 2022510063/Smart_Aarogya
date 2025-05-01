import React, { useState, useEffect } from 'react';
import { getDoctors, saveAppointment, getPatientById } from '../../utils/localStorage';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { id } = useParams(); // Matches :id in the route
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null); // State for patient info

  // Fetch doctors and patient data
  useEffect(() => {
    const doctorsList = getDoctors();
    setDoctors(doctorsList);
    
    // Fetch patient details
    const patientData = getPatientById(id);
    if (patientData) {
      setPatient(patientData);
    } else {
      alert("Patient not found!");
    }
  }, [id]); // ✅ Now includes id
  
  // Handle booking confirmation
  const handleBooking = () => {
    if (!selectedDoctor || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const confirmed = window.confirm(
      `Proceed to pay ₹${selectedDoctor.fee} for appointment with Dr. ${selectedDoctor.name}?`
    );
    if (!confirmed) return;

    if (!patient) {
      alert('Patient not found!');
      return;
    }

    const newAppointment = {
      patientId: id,
      patientName: patient.name,
      doctor: selectedDoctor.name,
      date,
      time,
      status: 'Booked',
      paymentStatus: 'Paid',
      fee: selectedDoctor.fee
    };

    saveAppointment(newAppointment);
    alert('Appointment booked and payment successful!');
    navigate('/patient/dashboard');  // You can change this to stay on the same page if needed
  };

  // Ensure patient is found before rendering the component
  if (!patient) {
    return <div className="container my-5">Loading patient details...</div>;
  }

  return (
    <div className="container my-5">
      {/* Profile and Dashboard section */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title text-danger">Patient Profile</h4>
          <p><strong>Name: </strong>{patient.name}</p>
          <p><strong>Email: </strong>{patient.email}</p>
          <p><strong>Contact: </strong>{patient.contact}</p>
          {/* You can add more patient details here if necessary */}
        </div>
      </div>

      <h2 className="text-center text-danger mb-4">Book Appointment</h2>

      <div className="row">
        {doctors.map((doctor) => (
          <div className="col-md-4 mb-4" key={doctor.id}>
            <div className={`card h-100 ${selectedDoctor?.id === doctor.id ? 'border-danger' : ''}`}>
              <img
                src={doctor.photo || 'https://via.placeholder.com/150'}
                className="card-img-top"
                alt={doctor.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-danger">{doctor.name}</h5>
                <p className="card-text">{doctor.specialization}</p>
                <p className="card-text fw-bold">Fee: ₹{doctor.fee}</p>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  {selectedDoctor?.id === doctor.id ? "Selected" : "Select Doctor"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="card mt-4 p-4 bg-light">
          <h4 className="mb-3 text-danger">Appointment Details</h4>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Consultation Fee</label>
            <input
              type="text"
              className="form-control"
              value={`₹${selectedDoctor.fee}`}
              disabled
            />
          </div>
          <button className="btn btn-danger mt-3" onClick={handleBooking}>
            Confirm & Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
