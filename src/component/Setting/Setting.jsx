// src/pages/Setting.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './Setting.css';

const Setting = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    let payload;
    try {
      payload = jwtDecode(token);
    } catch {
      navigate('/login');
      return;
    }

    // Pull fields out of your JWT payload (adjust names as necessary)
    setProfile({
      name: payload.name || payload.fullName || 'N/A',
      email: payload.email || payload.sub || 'N/A',
      phone: payload.phone || payload.mobile || 'N/A',
      dob: payload.dob || payload.dateOfBirth || '',
      address: payload.address || 'N/A'
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (!profile) {
    return null; // or a loading spinner
  }

  return (
    <div className="settings-page">
      <aside className="sidebar">
        <h2 className="logo">HCMC Metro</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Available Lines</li>
            <li>Purchase Ticket</li>
            <li>History</li>
            <li className="active">Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>Settings</h1>
        </header>
        <div className="profile-card">
          <h2>My Profile</h2>
          <div className="profile-item">
            <span className="label">Name</span>
            <span className="value">{profile.name}</span>
          </div>
          <div className="profile-item">
            <span className="label">Email</span>
            <span className="value">{profile.email}</span>
          </div>
          <div className="profile-item">
            <span className="label">Phone</span>
            <span className="value">{profile.phone}</span>
          </div>
          <div className="profile-item">
            <span className="label">Date of Birth</span>
            <span className="value">{profile.dob}</span>
          </div>
          <div className="profile-item">
            <span className="label">Address</span>
            <span className="value">{profile.address}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default Setting;
