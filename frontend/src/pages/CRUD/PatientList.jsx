import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/patients/all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Pacientes</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.name} - {patient.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientsList;
