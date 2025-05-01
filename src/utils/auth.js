export const savePatient = (patient) => {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));
  };
  
  export const authenticatePatient = (email, password) => {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    return patients.find(
      (patient) => patient.email === email && patient.password === password
    );
  };
  