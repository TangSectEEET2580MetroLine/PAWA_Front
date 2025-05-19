import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TicketDetail.css';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch từ API backend: GET /api/tickets/{id}
    // Hiện tại giả lập dữ liệu:
    const data = {
      id,
      departureStation: 'Ben Thanh Station',
      arrivalStation:   'An Phu Station',
      numberOfStations: 6,
      price:            '₫12.000',
      status:           'INACTIVE',
      issueDate:        '2025-05-19',
      expiryDate:       '2025-05-20'
    };
    setTicket(data);
  }, [id]);

  if (!ticket) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="ticket-detail-container">
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
