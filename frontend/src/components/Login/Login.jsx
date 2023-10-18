import React from "react";

const Login = () => {
  return (
    <>
      <div className="login-container">
        <form id="form-login" className="sign-in-form">
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
      </div>
    </>
  );
};

export default Login;