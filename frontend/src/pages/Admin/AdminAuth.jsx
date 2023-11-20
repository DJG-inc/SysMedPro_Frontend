import React, { useRef, useState } from "react";
import "./AdminAuth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AdminAuth() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const emailRegisterRef = useRef(null);
  const passwordRegisterRef = useRef(null);

  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/login",
        data
      );

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente",
      });


      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/create-doctor/");
      }


    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/register",
        {
          email: emailRegisterRef.current.value,
          username: nameRef.current.value,
          password: passwordRegisterRef.current.value,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Te has registrado correctamente",
      });

    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.status);
    }
  };

  return (
    <>
      <div className="body">
        <div className="container-auth">
          <div className="forms">
            <div className={`form ${isLoginForm ? "login" : "register"}`}>
              <span className="title">
                {isLoginForm ? "Iniciar Sesión" : "Registrarse"}
              </span>
              <form
                id={isLoginForm ? "form-login" : "form-register"}
                onSubmit={isLoginForm ? handleLogin : handleRegister}
              >
                {!isLoginForm && (
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Nombre"
                      ref={nameRef}
                      required
                    />
                  </div>
                )}
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="E-mail"
                    ref={isLoginForm ? emailRef : emailRegisterRef}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    ref={isLoginForm ? passwordRef : passwordRegisterRef}
                    required
                  />
                </div>
                {!isLoginForm && (
                  <div className="checkbox-text">
                    {/* Puedes agregar elementos específicos para el formulario de registro aquí */}
                  </div>
                )}
                <div className="input-field button">
                  <input
                    type="submit"
                    value={isLoginForm ? "Iniciar sesión" : "Registrarme"}
                  />
                </div>
              </form>
              <div className="toggle-form">
                <span onClick={handleToggleForm}>
                  {isLoginForm
                    ? "¿No tienes cuenta? Regístrate"
                    : "¿Ya tienes cuenta? Iniciar Sesión"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAuth;
