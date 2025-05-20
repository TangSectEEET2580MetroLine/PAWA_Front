// src/components/Payment/Payment.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  purchaseTicketApi,
  createStripeCheckoutSession
} from '../../http_call/HttpRequest';
import { STRIPE_PUBLISHABLE_KEY } from '../../service_url/AppUrlConfig';
import './Payment.css';

if (!STRIPE_PUBLISHABLE_KEY) {
  console.error('⚠️ Missing Stripe publishable key');
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};

  const {
    ticketTypeId,
    lineId,
    departureStation,
    arrivalStation,
    quantity,
    totalPrice
  } = state || {};

  const [method, setMethod]   = useState('e-wallet');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const formattedTotal = totalPrice
    ? totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    : '0₫';

  const handleContinue = async () => {
    setLoading(true);
    setError('');

    try {
      if (method === 'e-wallet') {
        // match PurchaseTicketRequestDTO exactly
        await purchaseTicketApi({
          passengerId:      localStorage.getItem('userId'),
          ticketType:       ticketTypeId,
          metroLineId:      lineId,
          departureStation,
          arrivalStation,
          numberOfStations: quantity
        });

        navigate('/confirmation', {
          state: { totalPrice, quantity, departureStation, arrivalStation }
        });
      } else {
        const { data } = await createStripeCheckoutSession({ amount: totalPrice });
        const stripe  = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Error, please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        disabled={loading}
      >
        ← Back
      </button>

      <h1 className="payment-title">Choose Payment Method</h1>

      <div className="payment-card">
        <form>
          <label className={`radio-option ${method === 'e-wallet' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value="e-wallet"
              checked={method === 'e-wallet'}
              onChange={() => setMethod('e-wallet')}
              disabled={loading}
            />
            <div className="radio-content">
              <div className="radio-label">
                E-Wallet
                <span className="price-tag">{formattedTotal}</span>
              </div>
              <div className="radio-description">Pay from your balance</div>
            </div>
          </label>

          <label className={`radio-option ${method === 'stripe' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={method === 'stripe'}
              onChange={() => setMethod('stripe')}
              disabled={loading}
            />
            <div className="radio-content">
              <div className="radio-label">Credit Card (Stripe)</div>
              <div className="radio-description">Visa, MasterCard, etc.</div>
            </div>
          </label>
        </form>

        <div className="summary">
          <span>Total:</span>
          <strong>{formattedTotal}</strong>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="payment-actions">
        <button
          className="btn-text"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Back
        </button>
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? 'Processing…' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
