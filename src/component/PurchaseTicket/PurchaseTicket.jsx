// src/components/PurchaseTicket/PurchaseTicket.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllTicketTypes,
  getAllLines,
} from '../../http_call/HttpRequest';
import './PurchaseTicket.css';

export default function PurchaseTicket() {
  const navigate = useNavigate();

  // ─── Backend data ────────────────────────────────────
  const [types, setTypes]   = useState([]);
  const [lines, setLines]   = useState([]);
  const [routes, setRoutes] = useState([]);

  // ─── Form state ─────────────────────────────────────
  const [ticketTypeId, setTicketTypeId] = useState('');
  const [lineId,       setLineId]       = useState('');
  const [routeKey,     setRouteKey]     = useState('');
  const [quantity,     setQuantity]     = useState(1);
  const [error,        setError]        = useState('');

  // Load ticket types & lines
  useEffect(() => {
    Promise.all([getAllTicketTypes(), getAllLines()])
      .then(([typesRes, linesRes]) => {
        setTypes(typesRes.data);
        setLines(linesRes.data);
        if (typesRes.data.length) setTicketTypeId(typesRes.data[0].id);
        if (linesRes.data.length)  setLineId(linesRes.data[0].id);
      })
      .catch(() => setError('Error loading data.'));
  }, []);

  // Build routes when line changes
  useEffect(() => {
    const line = lines.find(l => l.id === lineId);
    if (!line) return setRoutes([]);
    const names = line.stations || [];
    const pairs = names.slice(0, -1).map((from,i) => ({
      from,
      to:   names[i+1],
      label: `${from} → ${names[i+1]}`
    }));
    setRoutes(pairs);
    if (pairs.length) setRouteKey(`${pairs[0].from}|${pairs[0].to}`);
  }, [lineId, lines]);

  // Price calc
  const unitPrice  = types.find(t => t.id === ticketTypeId)?.price || 0;
  const totalPrice = unitPrice * quantity;
  const formatted  = totalPrice.toLocaleString('vi-VN') + '₫';

  // Always navigate to /payment
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!ticketTypeId || !lineId || !routeKey) {
      return setError('Please fullfil the categories.');
    }
    const [departureStation, arrivalStation] = routeKey.split('|');

    navigate('/payment', {
      state: {
        ticketTypeId,
        lineId,
        departureStation,
        arrivalStation,
        quantity,
        unitPrice,
        totalPrice
      }
    });
  };

  return (
    <div className="purchase-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="page-title">Purchase Ticket</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Ticket Type</label>
            <select
              value={ticketTypeId}
              onChange={e => setTicketTypeId(e.target.value)}
            >
              {types.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.price.toLocaleString()}₫
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Line</label>
            <select
              value={lineId}
              onChange={e => setLineId(e.target.value)}
            >
              {lines.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Route</label>
            <select
              value={routeKey}
              onChange={e => setRouteKey(e.target.value)}
            >
              {routes.map(r => (
                <option key={`${r.from}|${r.to}`} value={`${r.from}|${r.to}`}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Total Price</label>
            <div className="total-price">{formatted}</div>
          </div>

          <div className="button-wrapper">
            <button type="submit" className="purchase-button">
              Purchase
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
