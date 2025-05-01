import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/localStorage';


const ProtectedRoute = ({ children, role }) => {
  const currentUser = getCurrentUser();
  
  if (!currentUser || currentUser.role !== role) {
    return <Navigate to={`/${role}-login`} replace />;
  }
  
  return children;
};

export default ProtectedRoute;