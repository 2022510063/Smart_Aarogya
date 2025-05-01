import React from 'react';
import BackToHome from '../components/common/BackToHome';

const About = () => {
  return (
    <div className="container py-5">
      <BackToHome />
      <h2 className="mb-4">About SmartAarogya</h2>
      <div className="card p-4">
        <p>SmartAarogya is a comprehensive hospital management system designed to streamline healthcare operations.</p>
        <p>Our mission is to provide efficient tools for both healthcare providers and patients, making medical management seamless and accessible.</p>
        <h4 className="mt-4">Our Features:</h4>
        <ul>
          <li>Patient registration and management</li>
          <li>Doctor appointment scheduling</li>
          <li>Secure patient records</li>
          <li>Admin dashboard for hospital staff</li>
        </ul>
      </div>
    </div>
  );
};

export default About;