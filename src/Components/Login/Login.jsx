// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../AuthContext/AuthContext";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    console.log(success)
    if (success) {
      setLoginMessage("Login Success");
      login();
      setTimeout(() => navigate("/dashboard"), 2000);
    }else{
      setLoginMessage("Login Failed");
    }
  };

  return (
    <div className="container mt-7">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg mt-3">
                  Login
                </button>
              </form>
              {/* {loginMessage && <p className="mt-3">{loginMessage}</p>} */}
              {loginMessage && (
            <div
              className={`alert ${
                loginMessage.includes("Success")
                  ? "alert-success"
                  : "alert-danger"
              } mt-3`}
              role="alert"
            >
              {loginMessage}
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
