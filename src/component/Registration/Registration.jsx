// src/component/Registration/Registration.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerRequest }      from '../../http_call/HttpRequest';
import './Registration.css';

const Registration = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nationalId: '',
    dateOfBirth: '',
    residenceAddress: '',
    phoneNumber: '',
    studentId: '',
    disabilityStatus: false,
    revolutionaryContributionStatus: false
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {

      const res = await registerRequest(form);
      if (res.status === 201) {
        navigate('/login');
      } else {
        setError('Invalid Inforamtion, please try again!');
      }
    } catch (err) {
      console.error(err);

      const msg = err.response?.data;

      setError(Array.isArray(msg) ? msg.join(', ') : msg || 'System Errors!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-logo">
          <div className="logo-circle">M</div>
          <span className="logo-text">HCMC Metro</span>
        </div>

        <h2 className="registration-title">Registration</h2>

        {error && <div className="registration-error">{error}</div>}

        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Email & Password */}
          <div className="grid-2">
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* First / Middle Name */}
          <div className="grid-2">
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Last / National ID */}
          <div className="grid-2">
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>National ID</label>
              <input
                name="nationalId"
                value={form.nationalId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DOB / Address */}
          <div className="grid-2">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Residence Address</label>
              <input
                name="residenceAddress"
                value={form.residenceAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone / Student ID */}
          <div className="grid-2">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Student ID</label>
              <input
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Optional: disability & contribution status */}
          <div className="grid-2">
            <div className="form-group">
              <label>
                <input
                  name="disabilityStatus"
                  type="checkbox"
                  checked={form.disabilityStatus}
                  onChange={handleChange}
                />{" "}
                Disability Status
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  name="revolutionaryContributionStatus"
                  type="checkbox"
                  checked={form.revolutionaryContributionStatus}
                  onChange={handleChange}
                />{" "}
                Revolutionary Contribution
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-signup"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="registration-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
