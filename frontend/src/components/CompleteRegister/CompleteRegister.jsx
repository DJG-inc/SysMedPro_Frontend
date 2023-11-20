import React, { useState } from "react";
import "./CompleteRegister.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthPatient } from "../../context/AuthPatientContext";


export const CompleteRegister = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const { completeRegister } = useAuthPatient();


  const handleSubmit = async (e) => {
    e.preventDefault();

    //verificar que los campos no esten vacios
    if (
      first_name === "" ||
      last_name === "" ||
      date_of_birth === "" ||
      address === "" ||
      phone_number === "" ||
      gender === ""
    ) {
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
      }).fire({
        icon: "error",
        title: "All fields are required",
      });
      return;
    }

    //verificar que el telefono sea numerico
    if (isNaN(phone_number)) {
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
      }).fire({
        icon: "error",
        title: "The phone must be numeric",
      });
      return;
    }

    //verificar que el telefono tenga 10 digitos
    if (phone_number.length !== 10) {
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
      }).fire({
        icon: "error",
        title: "The phone number must have 10 digits",
      });
      return;
    }

    //verificar que la fecha de nacimiento sea menor a la fecha actual
    const date = new Date(date_of_birth);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const newDate = day + "/" + month + "/" + year;
    const date_of_birth2 = new Date(newDate);
    const today = new Date();
    if (date_of_birth2 > today) {
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
      }).fire({
        icon: "error",
        title: "The date of birth must be less than the current date",
      });
      return;
    }

    //verificar que la fecha de nacimiento sea mayor a 18 años
    const birthDate = new Date(date_of_birth);
    const today2 = new Date();
    const diff = today2 - birthDate;
    const age = Math.floor(diff / 31557600000);
    if (age < 18) {
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
      }).fire({
        icon: "error",
        title: "You must be over 18 years old",
      });
      return;
    }

    //verificar que el nombre y apellido no contengan numeros
    const regex = /[0-9]/;
    if (regex.test(first_name) || regex.test(last_name)) {
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
      }).fire({
        icon: "error",
        title: "The first and last name must not contain a numbers",
      });
      return;
    }

    //verificar que el nombre y apellido no contengan caracteres especiales
    const regex2 = /[!@#$%^&*(),.?":{}|<>]/g;
    if (regex2.test(first_name) || regex2.test(last_name)) {
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
      }).fire({
        icon: "error",
        title: "The first and last name must not contain special characters",
      });
      return;
    }

    //verificar que la direccion no contenga caracteres especiales
    const regex3 = /[!@$%^&*(),.?":{}|<>]/g;
    if (regex3.test(address)) {
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
      }).fire({
        icon: "error",
        title: "The address must not contain special characters",
      });
      return;
    }

    await completeRegister(
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      gender,
      address
    );
  };

  return (
    <div className="complete-register">
      <div className="complete-register-container">
        <h2>Please complete your register</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your first name"
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter your last name"
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter your gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <input
            type="date"
            placeholder="Enter your date of birth"
            onChange={(e) => {
              setDate_of_birth(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter your address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setPhone_number(e.target.value);
            }}
          />
        </div>
        <button
          className="button-complete-register"
          value="Complete Register"
          onClick={handleSubmit}
        >
          Complete Register
        </button>
      </div>
    </div>
  );
};
