const USERS_KEY = 'users';
const PATIENTS_KEY = 'patients';
const APPOINTMENTS_KEY = 'appointments';
const CURRENT_USER_KEY = 'currentUser';

// ========== USERS ==========

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// ========== PATIENTS ==========

export const getPatients = () => {
  return JSON.parse(localStorage.getItem(PATIENTS_KEY)) || [];
};

export const getPatientById = (id) => {
  const patients = getPatients();
  return patients.find(patient => String(patient.id) === String(id)); // Fixed: robust comparison
};

// Improved savePatient for both create and update
export const savePatient = (patient) => {
  const patients = getPatients();
  
  if (patient.id) { // If id exists, it's an update
    const index = patients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      patients[index] = patient; // Update patient details
    }
  } else { // Otherwise, it's a new patient
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    patient.id = newId;
    patients.push(patient);
  }

  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));

  // Save the user info if it's a new user or updating user
  const users = getUsers();
  if (patient.id) {
    const userIndex = users.findIndex(u => u.id === patient.id);
    if (userIndex !== -1) {
      users[userIndex] = {
        id: patient.id,
        email: patient.email,
        password: patient.password,
        role: 'patient'
      };
    }
  } else {
    users.push({
      id: patient.id,
      email: patient.email,
      password: patient.password,
      role: 'patient'
    });
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// ========== APPOINTMENTS ==========

export const saveAppointment = (appointment) => {
  const appointments = getAppointments();
  appointments.push(appointment);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

export const getAppointments = () => {
  return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
};

// ========== AUTH ==========

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
};

export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Utility function to fetch all users and patients for debugging
export const debugData = () => {
  console.log('Current User:', getCurrentUser());
  console.log('Patients:', getPatients());
  console.log('Users:', getUsers());
};

// ========== DELETE PATIENT AND APPOINTMENT ==========

export const deletePatientById = (id) => {
  const patients = getPatients().filter(p => p.id !== parseInt(id));
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));

  // Also remove from users
  const users = getUsers().filter(u => u.id !== parseInt(id));
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const deleteAppointmentById = (id) => {
  const appointments = getAppointments().filter(a => a.id !== id);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

// ========== DOCTORS (Static for Demo) ==========

export const getDoctors = () => [
  {
    id: 1,
    name: "Dr. Meena",
    specialization: "Cardiologist",
    fee: 500,
    photo: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Dr. Raj",
    specialization: "Neurologist",
    fee: 600,
    photo: "https://randomuser.me/api/portraits/men/47.jpg"
  },
  {
    id: 3,
    name: "Dr. Alok",
    specialization: "Dermatologist",
    fee: 400,
    photo: "https://randomuser.me/api/portraits/men/55.jpg"
  }
];
