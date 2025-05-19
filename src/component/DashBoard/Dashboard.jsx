// src/component/DashBoard/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate }      from 'react-router-dom';
import { getAllTickets, getWallet }  from '../../http_call/HttpRequest';
import { jwtDecode }                 from 'jwt-decode';
import './Dashboard.css';
import trainImage                    from './assets/train.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  // Tickets state
  const [tickets, setTickets]               = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  // Wallet state
  const [walletBalance, setWalletBalance]   = useState('—');
  const [loadingWallet, setLoadingWallet]   = useState(true);

  // 1) Load tickets from backend
  useEffect(() => {
    getAllTickets()
      .then(res => {
        const mapped = res.data.map(t => ({
          id:   t.id,
          date: new Date(t.issueDate).toLocaleTimeString() + ' ' +
                new Date(t.issueDate).toLocaleDateString(),
          type: `${t.departureStation} → ${t.arrivalStation}`
        }));
        setTickets(mapped);
      })
      .catch(err => console.error('Failed to load tickets', err))
      .finally(() => setLoadingTickets(false));
  }, []);

  useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.warn('No authToken in localStorage');
    setLoadingWallet(false);
    return;
  }

  let payload;
  try {
    payload = jwtDecode(token);
    console.log('Decoded JWT payload:', payload);
  } catch (err) {
    console.error('Failed to decode JWT', err);
    setLoadingWallet(false);
    return;
  }

  // Try every possible claim name:
  const userId = payload.userId || payload.sub || payload.id || payload.user?.id;
  console.log('Dashboard will fetch wallet for userId=', userId);

  if (!userId) {
    console.warn('No userId claim found in token');
    setLoadingWallet(false);
    return;
  }

  getWallet(userId)
    .then(res => {
      console.log('Wallet API response:', res);
      const { balance } = res.data;
      setWalletBalance(`₫${balance.toLocaleString()}`);
    })
    .catch(err => {
      console.error('Failed to load wallet', err);
      setWalletBalance('—');
    })
    .finally(() => setLoadingWallet(false));
}, []);

  const ticketCount = tickets.length;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">HCMC Metro</div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
          <NavLink to="/lines"     className="nav-item">Available Lines</NavLink>
          <NavLink to="/purchase"  className="nav-item">Purchase Ticket</NavLink>
          <NavLink to="/history"   className="nav-item">History</NavLink>
        </nav>
        <div className="sidebar-footer">
          <NavLink to="/settings" className="nav-item">Settings</NavLink>
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
            <p>{loadingTickets ? '…' : ticketCount}</p>
          </div>
          <div className="card">
            <h3>e-Wallet Balance</h3>
            <p>{loadingWallet ? '…' : walletBalance}</p>
          </div>
        </section>

        <section className="bottom-section">
          <div className="table-container">
            <h2>Tickets</h2>
            {loadingTickets ? (
              <div className="loading">Loading tickets…</div>
            ) : (
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ticket type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(({ id, date, type }) => (
                    <tr key={id}>
                      <td>{date}</td>
                      <td>{type}</td>
                      <td className="arrow-cell">
                        <button
                          className="arrow-button"
                          onClick={() => navigate(`/tickets/${id}`)}
                          aria-label="View details"
                        >
                          →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
