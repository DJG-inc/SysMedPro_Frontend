import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook para acceder al contexto de autenticación
export const useAuthPatient = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const registerPatient = async (email, username, password) => {
    try {
      axios.post("https://sysmedpro-backend.onrender.com/api/v1/patients/register", {
        email,
        username,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const loginPatient = async (email, password) => {
    try {
      const response = await axios.post(
        "https://sysmedpro-backend.onrender.com/api/v1/patients/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.patient));
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: "You have successfully logged in",
        });
        if (response.data.patient.status === "PENDING") {
          navigate("/complete-register/" + response.data.patient.id);
        } else {
          navigate("/appointment/" + response.data.patient.id);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User or password incorrect",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User or password incorrect",
      });
      console.error(err);
    }
  };

  const logoutPatient = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }

  const completeRegister = async (
    first_name,
    last_name,
    phone,
    dob,
    gender,
    address
  ) => {
    try {
      //agarrar el id del parametro
      const id = window.location.pathname.split("/")[2];

      const response = await axios.post(
        `https://sysmedpro-backend.onrender.com/api/v1/patients/confirm/${id}`,
        {
          first_name,
          last_name,
          phone,
          dob,
          gender,
          address,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
        .fire({
          icon: "success",
          title: "User registered successfully",
        })
        .then(() => {
          navigate("/");
        });
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ registerPatient, loginPatient, completeRegister, logoutPatient }}
    >
      {children}
    </AuthContext.Provider>
  );
};
