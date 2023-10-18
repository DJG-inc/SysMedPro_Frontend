import React, { useRef } from "react";
import "./AdminAuth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminAuth() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(data);

    try {
        console.log(data);
       const response = await axios.post("http://localhost:3000/api/v1/admin/login", data)

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/patients");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      <div className="container-auth">
        <div className="forms">
          <div className="form login">
            <span className="title">Iniciar Sesion</span>
            <form id="form-login" onSubmit={handleLogin}>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  ref={emailRef}
                />
                <i className="uil uil-envelope icon"></i>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  required
                />
                <i className="uil uil-lock icon"></i>
                <i className="uil uil-eye-slash showHidePw"></i>
              </div>
              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input type="checkbox" id="logCheck" />
                  <label htmlFor="logCheck" className="text">
                    Remember me
                  </label>
                </div>
                <a href="./forgotPassDoctor&Admin.html" className="text">
                  Forgot password?
                </a>
              </div>
              <div className="input-field button">
                <input type="submit" value="login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;
