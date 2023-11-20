import React from "react";
import axios from "axios";
import "./ViewAppointment.css";

const ViewAppointment = ({ appointment, onAppointmentDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/appointments/${appointment.id}`);
      
      // Llamar a la función proporcionada desde AppointmentsPage
      if (onAppointmentDeleted) {
        onAppointmentDeleted(appointment.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = () => {
    // Aquí puedes manejar la lógica para actualizar la cita
    console.log("Actualizando cita...");
  };

  return (
    <div className="view-appointment-container">
      <h2 className="appointment-date">{appointment.date}</h2>
      <p className="appointment-reason">{appointment.reasonForVisit}</p>
      <p className="doctor-name">Doctor: {appointment.doctor_id}</p>
      <p className="status">Status: {appointment.status}</p>
      <div className="button-container">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ViewAppointment;