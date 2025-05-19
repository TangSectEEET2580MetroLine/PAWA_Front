import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function OAuth2Success() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      try {
        const payload = jwtDecode(token);
        if (payload.userId) {
          localStorage.setItem('userId', payload.userId);
        }
      } catch (_) {}
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);
  return <div>Signing you in…</div>;
}
