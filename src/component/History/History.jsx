// History.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { getTicketsByUserId } from '../../http_call/HttpRequest';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }

    let payload;
    try {
      payload = jwtDecode(token);
    } catch (err) {
      console.error('JWT decode error:', err);
      setError('Invalid token.');
      setLoading(false);
      return;
    }

    const userId = payload.userId || payload.sub || payload.id;
    if (!userId) {
      setError('User ID not found in token.');
      setLoading(false);
      return;
    }

    getTicketsByUserId(userId)
      .then(res => {
        console.log('Ticket history response:', res);
        // Handle 204 No Content
        if (res.status === 204) {
          setRecords([]);
        } else {
          const data = res.data;
          let list = [];
          // Normalize array shape
          if (Array.isArray(data)) {
            list = data;
          } else if (Array.isArray(data.tickets)) {
            list = data.tickets;
          } else if (Array.isArray(data.data)) {
            list = data.data;
          } else {
            console.warn('Unexpected data shape for ticket list:', data);
          }
          setRecords(list);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tickets:', err);
        setError('Unable to load ticket history.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading history...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="history-page">
      <main className="content">
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <header className="header">
          <h1>History</h1>
        </header>
        <section className="records">
          {records.map((r, idx) => (
            <div className="record-card" key={idx}>
              <div className="stations">
                <div className="station">
                  <span className="label">Departure Station</span>
                  <span className="value"><strong>{r.departureStation}</strong></span>
                </div>
                <div className="arrow">→</div>
                <div className="station">
                  <span className="label">Arrival Station</span>
                  <span className="value"><strong>{r.arrivalStation}</strong></span>
                </div>
              </div>
              <div className="details">
                <div>
                  <span className="label">Ticket Type</span>
                  <span className="value">{r.ticketType}</span>
                </div>
                <div>
                  <span className="label">Status</span>
                  <span className="value status">{r.status}</span>
                </div>
                <div>
                  <span className="label">Price</span>
                  <span className="value price">{`₫ ${Number(r.price).toLocaleString()}`}</span>
                </div>
                <div className="dates">
                  <div>
                    <span className="label">Issue Date</span>
                    <span className="value">{new Date(r.issueDate).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="label">Expiry Date</span>
                    <span className="value">{new Date(r.expiryDate).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default History;
