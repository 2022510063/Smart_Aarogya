import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">SmartAarogya</Link>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/faq" className="nav-link">FAQ</Link>
            </li>

            {/* Conditional rendering for patient role */}
            {userRole === 'patient' && (
              <>
                <li className="nav-item">
                  <Link to="/patient-dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to="/book-appointment" className="nav-link">Book Appointment</Link>
                </li>
              </>
            )}

            {/* Conditional rendering for admin role */}
            {userRole === 'admin' && (
              <li className="nav-item">
                <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            {/* Show login options when no user is logged in */}
            {!userRole ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  id="loginDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={24} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
                  <li><Link className="dropdown-item" to="/patient-login">Patient Login</Link></li>
                  <li><Link className="dropdown-item" to="/admin-login">Admin Login</Link></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
