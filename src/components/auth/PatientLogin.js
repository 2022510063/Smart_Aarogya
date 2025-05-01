import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticatePatient } from '../../utils/auth';
import { savePatient } from '../../utils/localStorage';
import { getDoctors } from '../../utils/localStorage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';

const PatientLogin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const patient = authenticatePatient(email, password);

    if (patient) {
      const doctors = getDoctors();

      if (doctors && doctors.length > 0) {
        const selectedDoctor = doctors[0];
        localStorage.setItem('selectedDoctor', JSON.stringify(selectedDoctor));

        // ✅ Save patient info for session/protected routes
        localStorage.setItem('loggedInUser', JSON.stringify({ id: patient.id, role: 'patient' }));

        // ✅ Navigate to dynamic book appointment route
        navigate(`/patient/book/${patient.id}`);
      } else {
        setError('No doctors available. Please try again later.');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields to sign up');
      return;
    }

    const newPatient = {
      id: Date.now(), // ✅ Ensure a unique ID is assigned
      name,
      email,
      password,
      age: '',
      gender: 'Male',
    };

    savePatient(newPatient);
    alert('Signup successful! Please log in.');
    setIsSignup(false);
    navigate('/patient-login');
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{isSignup ? 'Patient Signup' : 'Patient Login'}</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={isSignup ? handleSignup : handleLogin}>
            {isSignup && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-danger w-100">
              {isSignup ? 'Signup' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Already have an account? Login' : 'New user? Signup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
