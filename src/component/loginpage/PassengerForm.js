import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, createPassenger } from './api/LoginApi';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../auth/state/AuthProvider";
import { ACTIONS } from "../../auth/reducer/useAuthReducer";
import "./login.css";

function PassengerForm({ onCancel }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    nationalId: '',
    dateOfBirth: '',
    residenceAddress: '',
    phoneNumber: '',
    studentId: '',
    disabilityStatus: false,
    revolutionaryContributionStatus: false,
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.nationalId) {
      setError("First name, last name, and national ID are required.");
      return;
    }
    if (!state.token) {
      setError("You must be logged in to submit passenger information.");
      return;
    }
    try {
      // Extract userId from token
      const decoded = jwtDecode(state.token);
      const userId = decoded.userId;
      if (!userId) {
        setError("User ID not found in token.");
        return;
      }

      // Prepare passenger data according to backend template
      const passengerData = {
        userId,
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        nationalId: form.nationalId,
        dateOfBirth: form.dateOfBirth,
        residenceAddress: form.residenceAddress,
        phoneNumber: form.phoneNumber,
        studentId: form.studentId,
        disabilityStatus: form.disabilityStatus,
        revolutionaryContributionStatus: form.revolutionaryContributionStatus
      };

      // Call API to create passenger
      const response = await createPassenger(passengerData);
      if (response && (response.status === 200 || response.status === 201)) {
        navigate("/menu");
      } else {
        setError(response?.json?.message || "Failed to create passenger.");
      }
    } catch (err) {
      setError("An error occurred while submitting passenger information.");
    }
  }

  async function handleCancel() {
    if (state.token) {
      try {
        const decoded = jwtDecode(state.token);
        const userId = decoded.userId;
        if (userId) {
          await deleteUserById(userId);
          dispatch({ type: ACTIONS.LOGOUT });
        }
      } catch (err) {
        // Optionally handle decode or delete error
      }
    }
    navigate("/");
    if (onCancel) onCancel();
  }

  return (
    <div>
      <h2 className="text-center">Passenger Registration</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>National ID:</label>
          <input
            type="text"
            name="nationalId"
            value={form.nationalId}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Residence Address:</label>
          <input
            type="text"
            name="residenceAddress"
            value={form.residenceAddress}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="disabilityStatus"
            checked={form.disabilityStatus}
            onChange={handleChange}
            className="form-check-input"
            id="disabilityStatus"
          />
          <label className="form-check-label" htmlFor="disabilityStatus">
            Disability Status
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="revolutionaryContributionStatus"
            checked={form.revolutionaryContributionStatus}
            onChange={handleChange}
            className="form-check-input"
            id="revolutionaryContributionStatus"
          />
          <label className="form-check-label" htmlFor="revolutionaryContributionStatus">
            Revolutionary Contribution Status
          </label>
        </div>
        {error && (
          <div style={{ color: "red", marginTop: "4px" }}>{error}</div>
        )}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit
        </button>
        <div className="text-center mt-3">
          <span
            className="register-animate"
            onClick={handleCancel}
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            Cancel
          </span>
        </div>
      </form>
    </div>
  );
}

export default PassengerForm;