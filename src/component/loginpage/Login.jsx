// src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginRequest } from '../../http_call/HttpRequest';
import { HOST_URL_GG_LOGIN } from '../../service_url/AppUrlConfig'; 
import './login.css';
import { ReactComponent as GoogleIcon } from './assets/google-icon.svg'; 
import { jwtDecode } from 'jwt-decode';

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
      // 1) Authenticate and receive a JWT
      const { data } = await loginRequest(email, password);
      const { token } = data;
      if (!token) throw new Error('No token returned');

      // 2) Store the JWT
      localStorage.setItem('authToken', token);

      // 3) Decode it to read your custom "userId" claim
      //    (your backend does: claims.put("userId", userId) when generating the token)
      const payload = jwtDecode(token);
      const userId = payload.userId;
      if (userId) {
        localStorage.setItem('userId', userId);
      }

      // 4) Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400 || err.response?.status === 401) {
        setError('Invalid Email or Password.');
      } else {
        setError('Error logging in, please try again.');
      }
    }
  };

  const handleGoogle = () => {
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

        {/* Title */}
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

        {/* Sign up */}
        <div className="login-signup">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
