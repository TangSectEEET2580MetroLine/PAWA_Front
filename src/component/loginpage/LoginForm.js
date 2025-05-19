import React, { useState, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchAndSetPassenger } from "./api/LoginApi";
import { AuthContext } from "../../auth/state/AuthProvider";
import { ACTIONS } from "../../auth/reducer/useAuthReducer";

function LoginForm({ onRegisterClick }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const result = await loginUser(form.username, form.password);
      if (result.status === 200 && result.json?.token) {
        dispatch({ type: ACTIONS.LOGIN, payload: { token: result.json.token } });
        // Fetch passenger info and update state
        await fetchAndSetPassenger(dispatch, result.json.token, ACTIONS);
        navigate("/menu");
      } else {
        setError(result.json?.message || "Login failed.");
      }
    } catch (err) {
      setError("Network or server error.");
    }
  }

  return (
    <div>
      <h2 className="text-center">Passengers</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="form-control"
        />
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        {error && (
          <div className="text-danger text-center mb-2">{error}</div>
        )}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
        <div className="text-center mt-3">
          <span
            className="register-animate"
            onClick={onRegisterClick}
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

