import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoOCBC } from "../../assets";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="section-login">
      <div className="container-fluid p-0 m-0">
        <div className="row min-vh-100">
          <div
            className="col-lg-6 d-lg-block d-md-none left-side-login"
            id="left-side-login"
          ></div>
          <div className="col-lg-6 col-md-12 bg-white d-flex justify-content-center align-items-center right-side-login">
            <div className="card-login-form w-100">
              <div className="d-flex justify-content-center card-logo">
                <img src={LogoOCBC} />
              </div>
              <h3>Welcome Back</h3>
              <form>
                <div className="mb-3">
                  <label className="control-label">Username</label>
                  <input className="form-control" type="text" name="username" />
                </div>
                <div className="mb-3">
                  <label className="control-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                  />
                  <label className="form-check-label" for="remember">
                    Remember Me
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn w-100 btn-ocbc"
                  id="btn-login"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
