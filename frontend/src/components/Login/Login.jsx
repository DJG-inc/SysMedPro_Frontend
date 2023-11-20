import React from "react";

const Login = () => {
  return (
    <>
      <div className="login-container">
        <form id="form-login" className="sign-in-form">
          <h2 className="title">Log in</h2>
          <p className="social-text">Login to access the platform</p>
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
              placeholder="Password"
              id="pass-login"
              required
            />
          </div>
          <a href="./forgotPassPatient.html" className="social-text">
          Did you forget your password?
          </a>
          <input type="submit" value="Ingresar" className="btn solid" />
        </form>
      </div>
    </>
  );
};

export default Login;