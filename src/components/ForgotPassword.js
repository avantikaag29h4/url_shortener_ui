import { useState } from 'react';

const API = 'https://urlshortener-production-7d46.up.railway.app';

function ForgotPassword({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setMessage(data.message);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Forgot Password</h2>
      <p style={{ color: 'gray' }}>Enter your email and we'll send you a reset link.</p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '10px' }}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Remember your password?{' '}
        <span onClick={onSwitchToLogin} style={{ color: 'blue', cursor: 'pointer' }}>
          Login
        </span>
      </p>
    </div>
  );
}

export default ForgotPassword;