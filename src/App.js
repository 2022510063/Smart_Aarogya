import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import 'animate.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import AdminLogin from './components/auth/AdminLogin';
import PatientLogin from './components/auth/PatientLogin';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import AdminDashboard from './components/admin/AdminDashboard';
import PatientDashboard from './components/patient/PatientDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import Appointments from './components/admin/Appointments';
import BookAppointment from './components/patient/BookAppointment'; // Ensure this exists and is correct


import './assets/styles/main.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/patient/book/:id" element={<BookAppointment />} />
          <Route path="/patient/:id/book-appointment" element={<BookAppointment />} />

          {/* Authentication Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute role="admin">
                <Appointments />
              </ProtectedRoute>
            }
          />

          {/* Protected Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/book/:id"
            element={
              <ProtectedRoute role="patient">
                <BookAppointment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
