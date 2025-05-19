// src/component/TicketDetail/TicketDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }       from 'react-router-dom';
import { getTicketById }                from '../../http_call/HttpRequest';
import './TicketDetail.css';

const TicketDetail = () => {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const [ticket, setTicket]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getTicketById(id)
      .then(res => {
        setTicket(res.data);
      })
      .catch(err => {
        console.error('Fetch ticket failed', err);
        setError('Cant load information.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading ticket details…</div>;
  }
  if (error) {
    return <div className="loading">{error}</div>;
  }

  return (
    <div className="ticket-detail-container">
      {/* Back button */}
      <button 
        className="back-button" 
        onClick={() => navigate(-1)} 
        aria-label="Go back"
      >
        ← Back
      </button>

      <h2 className="detail-title">Ticket Details</h2>
      <div className="detail-card">
        <div className="detail-row">
          <div className="detail-label">Departure Station</div>
          <div className="detail-value">{ticket.departureStation}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Arrival Station</div>
          <div className="detail-value">{ticket.arrivalStation}</div>
        </div>

        <div className="detail-divider" />

        <div className="detail-row">
          <div className="detail-label">Number of Stations</div>
          <div className="detail-value">{ticket.numberOfStations}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Price</div>
          <div className="detail-value">{ticket.price}</div>
        </div>

        <div className="detail-divider" />

        <div className="detail-row">
          <div className="detail-label">Status</div>
          <div className="detail-value">{ticket.status}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Issue Date</div>
          <div className="detail-value">{ticket.issueDate}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Expiry Date</div>
          <div className="detail-value">{ticket.expiryDate}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
