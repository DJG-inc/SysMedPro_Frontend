import React from "react";

const Register = () => {
  return (
    <>
      <form id="form-register" className="sign-up-form">
        <h2 className="title">Registrate</h2>
        <p className="social-text">Registrate para usar la plataforma</p>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Nombre" id="name-register" required />
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
    </>
  );
};

export default Register;