import React from "react";
import axios from "axios";
import "./DocAppointments.css";
import Swal from "sweetalert2";

const DocAppointments = ({ appointment, onAppointmentDeleted, onAppointmentConfirmed, onAppointmentCanceled }) => {

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
      } finally {
        window.location.reload();
      }
    }
  };

  const handleCancel = async () => {
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
        await axios.put(
          `https://sysmedpro-backend.onrender.com/api/v1/appointments/cancelled/${appointment.id}`
        );

        if (onAppointmentCanceled) {
          onAppointmentCanceled(appointment.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    }
  }

  const handleConfirm = async () => {
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
        await axios.put(
          `https://sysmedpro-backend.onrender.com/api/v1/appointments/confirmed/${appointment.id}`
        );

        if (onAppointmentConfirmed) {
          onAppointmentConfirmed(appointment.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    }
  }


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
        <button className="update-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DocAppointments;
