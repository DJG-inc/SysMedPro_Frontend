import React, { useState, useEffect } from "react";
import "./AppointmentForm.css"; 
import axios from "axios";

const AppointmentForm = ({ user_id, onAppointmentCreated }) => {
  const [date, setDate] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [doctor_id, setDoctor_id] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const handleCreateAppointment = async () => {
    try {
      const data = { date, reasonForVisit, doctor_id };
      console.log(data);
      await axios.post(
        `https://sysmedpro-backend.onrender.com/api/v1/appointments/create/${user_id}`,
        data
      );
      // Después de la creación exitosa, llamar a la función proporcionada desde AppointmentsPage
      if (onAppointmentCreated) {
        onAppointmentCreated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctors = async () => {
    try {
      const response = await axios.get("https://sysmedpro-backend.onrender.com/api/v1/doctors/all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setDoctors(response.data.doctors);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="appointment-form-container">
      <h1 className="form-title">Take Appointment</h1>
      <div className="form-group">
        <label htmlFor="date">Fecha de la cita:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="reasonForVisit">Razón de la cita médica:</label>
        <input
          type="text"
          id="reasonForVisit"
          value={reasonForVisit}
          onChange={(e) => setReasonForVisit(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="doctor_id">Seleccionar doctor:</label>
        <select
          id="doctor_id"
          value={doctor_id}
          onChange={(e) => setDoctor_id(e.target.value)}
        >
          <option value="">Seleccionar doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.first_name} {doctor.last_name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="create-appointment-btn"
        onClick={handleCreateAppointment}
      >
        Create Appointment
      </button>
    </div>
  );
};

export default AppointmentForm;
