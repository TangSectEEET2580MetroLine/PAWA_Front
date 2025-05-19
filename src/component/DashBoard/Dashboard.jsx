// src/component/DashBoard/Dashboard.jsx

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import trainImage from './assets/train.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  // Tạm thời giả lập dữ liệu
  const ticketCount    = 5;
  const walletBalance  = '₫50,000';
  const tickets = [
    { id: 0, date: '02/10/2025', type: 'Ben Thanh → Sai Gon Zoo' },
    { id: 1, date: '02/10/2025', type: 'Ben Si-anh → Tan Phu Station' },
    { id: 2, date: '02/10/2025', type: 'Ben Thanh → Sai Gon Terminal' },
    { id: 3, date: '01/26/2025', type: 'Binh Thai → Independence Palace' },
    { id: 4, date: '01/26/2025', type: '01/26/2025 → Cho Lai Station' },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">HCMC Metro</div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-item" activeclassname="active">
            Dashboard
          </NavLink>
          <NavLink to="/lines" className="nav-item">
            Available Lines
          </NavLink>
          <NavLink to="/purchase" className="nav-item">
            Purchase Ticket
          </NavLink>
          <NavLink to="/history" className="nav-item">
            History
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <NavLink to="/settings" className="nav-item">
            Settings
          </NavLink>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <ul className="breadcrumb">
            <li><NavLink to="/dashboard">Home</NavLink></li>
            <li><NavLink to="/lines">Available Lines</NavLink></li>
            <li><NavLink to="/purchase">Purchase Ticket</NavLink></li>
          </ul>
          <div className="user-avatar">👤</div>
        </header>

        <h1 className="page-title">Dashboard</h1>

        <section className="cards">
          <div className="card">
            <h3>Total Tickets</h3>
            <p>{ticketCount}</p>
          </div>
          <div className="card">
            <h3>e-Wallet Balance</h3>
            <p>—</p>
          </div>
          <div className="card">
            <h3>e-Wallet Balance</h3>
            <p>{walletBalance}</p>
          </div>
        </section>

        <section className="bottom-section">
          <div className="table-container">
            <h2>Tickets</h2>
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ticket type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.date}</td>
                    <td>{ticket.type}</td>
                    <td className="arrow-cell">
                      <button
                        className="arrow-button"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                        aria-label="View details"
                      >
                        →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="image-container">
            <img src={trainImage} alt="Metro train" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
