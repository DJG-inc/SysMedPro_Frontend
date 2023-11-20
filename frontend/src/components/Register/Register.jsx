import React from "react";

const Register = () => {
  return (
    <>
      <form id="form-register" className="sign-up-form">
        <h2 className="title">Sign up</h2>
        <p className="social-text">Register to use the platform</p>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Name" id="name-register" required />
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
            placeholder="Password"
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