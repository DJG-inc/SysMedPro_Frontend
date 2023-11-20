import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocAppointments from "../../components/DocAppointments/DocAppointments";
import "../AppointmentsPage/AppointmentsPage.css";
import { Header } from "../../components/Header/Header";
import axios from "axios";

const DocAppointmentsPage = () => {
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [doctorLoaded, setDoctorLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDoctor = JSON.parse(sessionStorage.getItem("doctors"));
    if (storedDoctor) {
      setDoctor(storedDoctor);
      setDoctorLoaded(true);
      console.log(storedDoctor);
    }
  }, []);

  useEffect(() => {
    if (doctorLoaded) {
      getAppointment();
    }
  }, [doctorLoaded]); // Dependency on doctorLoaded

  const getAppointment = async () => {
    console.log(doctor.id);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/appointments/doctor/${doctor.id}`
      );
      setAppointments(response.data.appointments);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  console.log(appointments);

  const handleAppointmentDeleted = (deletedAppointmentId) => {
    // Filtra las citas eliminando la que tiene el ID correspondiente
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== deletedAppointmentId
    );

    // Actualiza la lista de citas
    setAppointments([...updatedAppointments]); // Forzar la actualización
  };

  const handleAppointmentConfirmed = (confirmedAppointmentId) => {
    // Deja la cita con el ID correspondiente como confirmada
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === confirmedAppointmentId) {
        return {
          ...appointment,
          confirmed: true,
        };
      }
      return appointment;
    });
    // Actualiza la lista de citas
    setAppointments([...updatedAppointments]); // Forzar la actualización
  };

  const handleAppointmentCanceled = (rejectedAppointmentId) => {
    // Deja la cita con el ID correspondiente como cancelada
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === rejectedAppointmentId) {
        return {
          ...appointment,
          confirmed: false,
        };
      }
      return appointment;
    });

    // Actualiza la lista de citas
    setAppointments([...updatedAppointments]); // Forzar la actualización
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
      <div className="appointments-page">
        {/* Optionally remove or adjust this section if doctors can create appointments */}
        <div className="view-appointments">
          <h2>Your Appointments</h2>
          {appointments.map((appointment) => (
            <DocAppointments
              key={appointment.id}
              appointment={appointment}
              onAppointmentDeleted={handleAppointmentDeleted} // Include or remove based on functionality
              onAppointmentConfirmed={handleAppointmentConfirmed}
              onAppointmentCanceled={handleAppointmentCanceled}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DocAppointmentsPage;
