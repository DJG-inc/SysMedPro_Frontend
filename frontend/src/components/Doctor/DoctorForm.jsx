// DoctorForm.jsx
import React, { useState } from "react";
import "./DoctorForm.css";
import axios from "axios";
import Swal from "sweetalert2";
const DoctorForm = ({ onDoctorCreated }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [telefono, setTelefono] = useState("");
  const [officeRoom, setOfficeRoom] = useState("");

  const handleCreateDoctor = async () => {
    try {
      const data = {
        first_name: name,
        last_name: lastname,
        email,
        password,
        username: nickname,
        phone: telefono,
        office_room: officeRoom,
        speciality,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/doctors/register",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Doctor creado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });

      // Actualiza la lista de doctores
      if (response.status === 200) {
        onDoctorCreated(response.data.newDoctor);
      }
    } catch (err) {
      console.error(err);
      console.error(err.response);
      console.error(err.response.data);
    }
  };

  return (
    <div className="doctor-form-container">
      <h1 className="form-title">Create Doctor</h1>
      <div className="form-content">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="speciality">Speciality:</label>
          <input
            type="text"
            id="speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Telefono:</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="officeRoom">Office Room:</label>
          <input
            type="text"
            id="officeRoom"
            value={officeRoom}
            onChange={(e) => setOfficeRoom(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="create-doctor-btn" onClick={handleCreateDoctor}>
          Create Doctor
        </button>
      </div>
    </div>
  );
};

export default DoctorForm;
