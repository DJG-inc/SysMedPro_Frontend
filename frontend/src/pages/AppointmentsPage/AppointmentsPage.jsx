import React, { useEffect, useState } from "react";
import AppointmentForm from "../../components/Appointment/AppointmentForm";
import ViewAppointment from "../../components/ViewAppointment/ViewAppointment";
import "./AppointmentsPage.css";
import { Header } from "../../components/Header/Header";
import { useAuthPatient } from "../../context/AuthPatientContext";
import axios from "axios";

const AppointmentsPage = () => {
  const { logoutPatient } = useAuthPatient();
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUserLoaded(true);
      console.log(storedUser);
    }
  }, []);

  useEffect(() => {
    // Llamar a getAppointment solo si el usuario se ha cargado correctamente
    if (userLoaded) {
      getAppointment();
    }
  }, [userLoaded]); // Dependencia de userLoaded

  const handleLogout = () => {
    logoutPatient();
  };

  const getAppointment = async () => {
    console.log(user.id);
    try {
      const response = await axios.get(
        `https://sysmedpro-backend.onrender.com/api/v1/appointments/patient/${user.id}`
      );
      setAppointments(response.data.appointments);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAppointmentDeleted = (deletedAppointmentId) => {
    // Filtra las citas eliminando la que tiene el ID correspondiente
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== deletedAppointmentId
    );

    // Actualiza la lista de citas
    setAppointments([...updatedAppointments]); // Forzar la actualización
  };

  return (
    <>
      <Header handleLogout={handleLogout}/>
      <div className="appointments-page">
        <div className="create-appointment">
          <h2>Create Appointment</h2>
          <AppointmentForm
            user_id={user.id}
            onAppointmentCreated={getAppointment}
          />
        </div>
        <div className="divider"></div>
        <div className="view-appointments">
          <h2>View Appointments</h2>
          {appointments.map((appointment) => (
            <ViewAppointment
              key={appointment.id}
              appointment={appointment}
              onAppointmentDeleted={handleAppointmentDeleted}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AppointmentsPage;
