import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import PatientList from './PatientList';
import Appointments from './Appointments';
import BackToHome from '../common/BackToHome';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <BackToHome />
      <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Patients" />
          <Tab label="Appointments" />
        </Tabs>
      </Box>
      <div className="tab-content">
        {tabValue === 0 && <PatientList />}
        {tabValue === 1 && <Appointments />}
      </div>
    </div>
  );
};

export default AdminDashboard;