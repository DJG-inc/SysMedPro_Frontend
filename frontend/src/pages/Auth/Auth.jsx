import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const registerPatient = async (e) => {
    e.preventDefault();
    const email = e.target["email-register"].value;
    const username = e.target["name-register"].value;
    const password = e.target["pass-register"].value;
    const data = { username, email, password };

    try {
      console.log(data);
      axios.post("http://localhost:3000/api/v1/patients/register", data);
    } catch (err) {
      console.error(err);
    }
  };

  const loginPatient = async (e) => {
    e.preventDefault();
    const email = e.target["email-login"].value;
    const password = e.target["pass-login"].value;
    const data = { email, password };

    try {
      const response = await axios.post("http://localhost:3000/api/v1/patients/login", data);
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Bienvenido",
          text: "Has iniciado sesión correctamente",
        });
        navigate("/patients");
      }

      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña incorrectos",
        });
      }
      
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
      });
      console.error(err);
    }
  };

  const toggleForm = () => {
    setIsLoginForm((prevState) => !prevState);
  };

  return (
    <div className={`container ${isLoginForm ? "" : "sign-up-mode"}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            id="form-login"
            className="sign-in-form"
            onSubmit={loginPatient}
          >
            <h2 className="title">Iniciar Sesion</h2>
            <p className="social-text">Ingresa para acceder a la plataforma</p>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="E-mail"
                id="email-login"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Contraseña"
                id="pass-login"
                required
              />
            </div>
            <a href="./forgotPassPatient.html" className="social-text">
              Olvidaste tu contraseña?
            </a>
            <input type="submit" value="Ingresar" className="btn solid" />
          </form>
          <form
            id="form-register"
            className="sign-up-form"
            onSubmit={registerPatient}
          >
            <h2 className="title">Registrate</h2>
            <p className="social-text">Registrate para usar la plataforma</p>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombre"
                id="name-register"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="E-mail"
                id="email-register"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Contraseña"
                id="pass-register"
                required
              />
            </div>
            <input type="submit" className="btn" value="Registrame" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nuevo por aca?</h3>
            <p>
              Si no haces parte de nuestra plataforma te invitamos a unirte a la
              comunidad.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={toggleForm}
            >
              Registrate
            </button>
          </div>

          <img
            src="https://janis.im/wp-content/uploads/2020/11/CUSTOMER-2.png"
            className="image"
            alt=""
          />
        </div>
        <a onClick={() => navigate("/admin")} className="panel-admin">
          <i className="fas fa-user-md"></i>Panel Administrativo
        </a>
        <div className="panel right-panel">
          <div className="content">
            <h3>Ya tienes una cuenta?</h3>
            <p>Si ya tienes cuenta inicia sesión para acceder al sistema</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={toggleForm}
            >
              INGRESA
            </button>
          </div>
          <img
            src="https://orientation-transition.fr/wp-content/uploads/2019/09/orientation-transition-entreprise-reclassement.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
