import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BackToHome = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="outline-danger" 
      onClick={() => navigate('/')}
      className="mb-3"
    >
      ← Back to Home
    </Button>
  );
};

export default BackToHome;