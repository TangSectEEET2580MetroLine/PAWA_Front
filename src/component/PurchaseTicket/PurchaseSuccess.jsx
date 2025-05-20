// src/components/PurchaseSuccess/PurchaseSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './PurchaseSuccess.css';

export default function PurchaseSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [verified, setVerified] = useState(false);
  const [error, setError]       = useState('');

  // Data from E-Wallet flow (passed via navigate)
  const {
    departureStation,
    arrivalStation,
    quantity,
    totalPrice
  } = state || {};

  const formattedTotal = totalPrice
    ? totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    : '';

  // If Stripe flow, optionally verify session on mount
  useEffect(() => {
    if (sessionId) {
      // If you have an endpoint to verify the session, call it here:
      fetch(`/api/payments/verify-session/${sessionId}`)
        .then(res => {
          if (!res.ok) throw new Error('Verification failed');
          return res.json();
        })
        .then(() => setVerified(true))
        .catch(err => {
          console.error(err);
          setError('');
        });
    }
  }, [sessionId]);

  const isStripeFlow = !!sessionId;

  return (
    <div className="success-page">
      <div className="success-card">
        <h1 className="success-title">🎉 Payment Complete!</h1>

        {isStripeFlow ? (
          // Stripe users
          <>
            {error ? (
              <p className="success-text error">{error}</p>
            ) : (
              <p className="success-text">
                {verified
                  ? 'Your Stripe payment was successful!'
                  : 'Finalizing your Stripe payment…'}
              </p>
            )}
          </>
        ) : (
          // E-Wallet users
          <>
            {departureStation && arrivalStation && (
              <p className="success-text">
                You’ve successfully purchased <strong>{quantity}</strong> ticket
                {quantity > 1 ? 's' : ''} from{' '}
                <strong>{departureStation}</strong> to{' '}
                <strong>{arrivalStation}</strong>.
              </p>
            )}
            {formattedTotal && (
              <p className="success-text">
                Total paid: <strong>{formattedTotal}</strong>
              </p>
            )}
          </>
        )}

        <button
          className="btn-primary"
          onClick={() => navigate(isStripeFlow ? '/dashboard' : '/history')}>
            {isStripeFlow ? 'Back to Dashboard' : 'View My Tickets'}
        </button>
      </div>
    </div>
  );
}
