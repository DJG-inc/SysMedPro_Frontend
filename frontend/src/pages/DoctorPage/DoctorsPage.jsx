// DoctorsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import DoctorForm from "../../components/Doctor/DoctorForm";
import "./DoctorsPage.css";
import { Header } from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/doctors/all",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setDoctors(response.data.doctors);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchDoctors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");

  }

  const handleDoctorCreated = (newDoctor) => {
    // Agrega el nuevo doctor a la lista
    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
      <div className="doctors-page">
        <div className="create-doctor">
          <h2>Create Doctor</h2>
          <DoctorForm onDoctorCreated={handleDoctorCreated} />
        </div>
        <div className="divider"></div>
        <div className="view-doctors">
          <h2>View Doctors</h2>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorsPage;
