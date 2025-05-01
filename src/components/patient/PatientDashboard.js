import React, { useState } from 'react';
import { Tab, Tabs, Box, Typography, Paper } from '@mui/material';
import BookAppointment from './BookAppointment';
import Profile from './Profile';
import BackToHome from '../common/BackToHome';

const PatientDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="container mt-5">
      <Paper elevation={3} className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Typography variant="h4" className="fw-bold text-primary">
            Patient Dashboard
          </Typography>
          <BackToHome />
        </div>

        {/* Tab Header */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Book Appointment" />
            <Tab label="My Profile" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <div className="mt-4">
          {tabValue === 0 && <BookAppointment />}
          {tabValue === 1 && <Profile />}
        </div>
      </Paper>
    </div>
  );
};

export default PatientDashboard;
