import React from "react";
import axios from "axios";
import "./ViewAppointment.css";
import Swal from "sweetalert2";

const ViewAppointment = ({ appointment, onAppointmentDeleted }) => {
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "You're sure?",
      text: "You will not be able to reverse this action",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `https://sysmedpro-backend.onrender.com/api/v1/appointments/${appointment.id}`
        );

        // Llamar a la función proporcionada desde AppointmentsPage
        if (onAppointmentDeleted) {
          onAppointmentDeleted(appointment.id);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdate = () => {
    // Aquí puedes manejar la lógica para actualizar la cita
    console.log("Actualizando cita...");
  };

  return (
    <div className="view-appointment-container">
      <h2 className="appointment-date">{appointment.reasonForVisit}</h2>
      <p className="appointment-reason">Date: {appointment.date}</p>
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
