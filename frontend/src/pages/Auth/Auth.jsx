import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useAuthPatient } from "../../context/AuthPatientContext";

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const { registerPatient, loginPatient } = useAuthPatient();

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target["email-register"].value;
    const username = e.target["name-register"].value;
    const password = e.target["pass-register"].value;

    await registerPatient(email, username, password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target["email-login"].value;
    const password = e.target["pass-login"].value;
    const data = { email, password };

    await loginPatient(email, password);
  };

  const toggleForm = () => {
    setIsLoginForm((prevState) => !prevState);
  };

  return (
    <div className={`container ${isLoginForm ? "" : "sign-up-mode"}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form id="form-login" className="sign-in-form" onSubmit={handleLogin}>
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
            <input type="submit" value="Enter" className="btn solid" />
          </form>
          <form
            id="form-register"
            className="sign-up-form"
            onSubmit={handleRegister}
          >
            <h2 className="title">Sign up</h2>
            <p className="social-text">Register to use the platform</p>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
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
                placeholder="Password"
                id="pass-register"
                required
              />
            </div>
            <input type="submit" className="btn" value="Register" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              If you are not part of our platform, we invite you to join the
              community.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={toggleForm}
            >
              Sign up
            </button>
          </div>

          <img
            src="https://janis.im/wp-content/uploads/2020/11/CUSTOMER-2.png"
            className="image"
            alt=""
          />
        </div>
        <a onClick={() => navigate("/admin")} className="panel-admin">
          <i className="fas fa-user-md"></i>Administrative Panel
        </a>
        <div className="panel right-panel">
          <div className="content">
            <h3>Do you already have an account?</h3>
            <p>If you already have an account, log in to access the system</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={toggleForm}
            >
              ENTER
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
