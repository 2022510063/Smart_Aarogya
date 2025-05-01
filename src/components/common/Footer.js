import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5>SmartAarogya</h5>
            <p>Your trusted healthcare partner</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-white">About Us</Link></li>
              <li><Link to="/privacy" className="text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email: info@smartaarogya.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>© {new Date().getFullYear()} SmartAarogya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;