// DoctorCard.jsx
import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const { first_name, last_name, username, email, speciality, phone, office_room } = doctor;

  return (
    <div className="doctor-card">
      <h2>{first_name} {last_name}</h2>
      <p>Nickname: {username}</p>
      <p>Email: {email}</p>
      <p>Speciality: {speciality}</p>
      <p>Telefono: {phone}</p>
      <p>Office Room: {office_room}</p>
    </div>
  );
};

export default DoctorCard;
