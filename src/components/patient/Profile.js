import React, { useEffect, useState } from 'react';
import { getCurrentUser, getPatients, savePatient } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'Male'
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    const patients = getPatients();

    if (!currentUser || !currentUser.id) {
      alert('User not logged in. Redirecting to login.');
      return navigate('/patient-login');
    }

    const matchedPatient = patients?.find(p => p.id === currentUser.id);

    if (!matchedPatient) {
      alert('Patient record not found.');
    } else {
      setPatient(matchedPatient);
      setFormData({
        name: matchedPatient.name || '',
        email: matchedPatient.email || '',
        age: matchedPatient.age || '',
        gender: matchedPatient.gender || 'Male'
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patient) {
      alert('No patient data found to update.');
      return;
    }

    const updatedPatient = { ...patient, ...formData };
    savePatient(updatedPatient);
    alert('✅ Profile updated successfully!');
  };

  return (
    <div className="card shadow p-4">
      <h3 className="mb-4 text-primary">My Profile</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z ]+"
            title="Only letters and spaces allowed"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="120"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
