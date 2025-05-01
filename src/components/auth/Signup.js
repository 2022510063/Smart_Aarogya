import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePatient } from '../../utils/localStorage'; // Assuming savePatient is the function to save data
import './Auth.css';


const Signup = () => {
  const [patient, setPatient] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'Male',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!patient.name || !patient.email || !patient.password) {
      setError('Please fill all required fields');
      return;
    }

    try {
      savePatient(patient); // Save patient data
      setError(''); // Reset error if successful
      navigate('/patient-login'); // Redirect to login page after successful signup
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Patient Signup</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name*</label>
              <input
                type="text"
                className="form-control"
                value={patient.name}
                onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                required
                pattern="[A-Za-z ]+"
                title="No numbers allowed"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email*</label>
              <input
                type="email"
                className="form-control"
                value={patient.email}
                onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password*</label>
              <input
                type="password"
                className="form-control"
                value={patient.password}
                onChange={(e) => setPatient({ ...patient, password: e.target.value })}
                required
                minLength="6"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                value={patient.age}
                onChange={(e) => setPatient({ ...patient, age: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={patient.gender}
                onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Register
            </button>
          </form>
          <div className="text-center mt-3">
            <a href="/patient-login">Already have an account? Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
