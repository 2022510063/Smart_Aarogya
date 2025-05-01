import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import the image
import backgroundImage from '../assets/download3.jfif';
import './Home.css'; // Import custom CSS file for animation

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Background Image and Overlay */}
      <div
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '90vh',
          position: 'relative',
        }}
      >
        <div className="container text-center py-5 bg-dark bg-opacity-50 rounded animate__animated animate__fadeIn">
          <h1 className="display-4 fw-bold animated-heading">Welcome to SmartAarogya</h1>
          <p className="lead mb-4">Your complete hospital management solution</p>

          {/* Login Buttons as Icon List */}
          <ul className="list-unstyled d-flex justify-content-center gap-4">
            <li>
              <Link to="/patient-login" className="btn btn-light btn-lg d-flex align-items-center gap-2">
                <i className="bi bi-person-fill"></i> Patient Login
              </Link>
            </li>
            <li>
              <Link to="/admin-login" className="btn btn-outline-light btn-lg d-flex align-items-center gap-2">
                <i className="bi bi-person-gear"></i> Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 p-4">
              <i className="bi bi-calendar-check display-4 text-danger mb-3"></i>
              <h4>Easy Appointments</h4>
              <p>Book doctor appointments with just a few clicks</p>
            </div>
            <div className="col-md-4 p-4">
              <i className="bi bi-file-earmark-medical display-4 text-danger mb-3"></i>
              <h4>Patient Management</h4>
              <p>Efficient system for managing patient records</p>
            </div>
            <div className="col-md-4 p-4">
              <i className="bi bi-shield-lock display-4 text-danger mb-3"></i>
              <h4>Secure System</h4>
              <p>Your data is always protected and private</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
