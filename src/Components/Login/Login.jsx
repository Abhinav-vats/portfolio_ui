// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Mock API call to login endpoint
      const response = await axios.post('/api/login', { username, password });
      if (response.data.success) {
        setLoginMessage('Login successful!');
        setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
      } else {
        setLoginMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('An error occurred while logging in.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" className="btn btn-primary mt-3">
                  Login
                </button>
              </form>
              {loginMessage && <p className="mt-3">{loginMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
