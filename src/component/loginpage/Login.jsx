// src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginRequest, googleSignInRequest } from '../../http_call/HttpRequest';
import { HOST_URL_GG_LOGIN } from '../../service_url/AppUrlConfig'; 
import './login.css';
import { ReactComponent as GoogleIcon } from './assets/google-icon.svg'; 

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginRequest(email, password);
      const { token } = response.data;

      // save JWT Token if login success
      if (token) {
        localStorage.setItem('authToken', token);
      }

      // after Login, go to main page
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        setError('Invalid Email or Password.');
      } else {
        setError('Errors, please try again');
      }
    }
  };

    const handleGoogle = () => {
        // full-page redirect to Spring's authorization endpoint
        window.location.href = HOST_URL_GG_LOGIN;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="logo-circle">M</div>
          <span className="logo-text">HCMC Metro</span>
        </div>

        <h2 className="login-title">Log In</h2>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <label className="login-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span>or</span>
        </div>

        {/* Google OAuth */}
        <button className="btn btn-google" onClick={handleGoogle}>
          <GoogleIcon className="google-icon" />
          <span>Continue with Google</span>
        </button>

        {/* Sign up link */}
        <div className="login-signup">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
