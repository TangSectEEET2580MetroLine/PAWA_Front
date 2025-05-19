import React, { useState, useContext } from 'react';
import { registerUser, loginUser } from './api/LoginApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../auth/state/AuthProvider";
import { ACTIONS } from "../../auth/reducer/useAuthReducer";
import "./login.css";

function RegisterForm({ onCancel }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === "password" || name === "confirmPassword") {
      setError("");
    }
    if (name === "email") {
      setEmailError("");
    }
  }

  function validateEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      // Register user
      const response = await registerUser(form.email, form.password);
      if (response && response.status === 201) { // 201 = CREATED
        // Registration successful, now log in
        const loginResponse = await loginUser(form.email, form.password);
        if (loginResponse && loginResponse.status === 200 && loginResponse.json?.token) {
          dispatch({ type: ACTIONS.LOGIN, payload: { token: loginResponse.json.token } });
          navigate('/passengerform');
        } else {
          setError("Registration succeeded, but login failed.");
        }
      } else {
        setError(response?.json?.message || 'Registration failed.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  }

  return (
    <div>
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="register-email">Email:</label>
        <input
          type="email"
          id="register-email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="form-control"
        />
        {emailError && (
          <div style={{ color: "red", marginTop: "4px" }}>{emailError}</div>
        )}
        <div className="form-group">
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="register-confirm-password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="form-control"
          />
          {error && (
            <div style={{ color: "red", marginTop: "4px" }}>{error}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Register
        </button>
        <div className="text-center mt-3">
          <span
            className="register-animate"
            onClick={onCancel}
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            Cancel
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;