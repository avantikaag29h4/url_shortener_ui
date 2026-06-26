import { useState } from 'react';

const API = 'https://urlshortener-production-7d46.up.railway.app';

function ResetPassword({ onSwitchToLogin }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get token from URL
  const token = new URLSearchParams(window.location.search).get('token');

  const handleReset = async () => {
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => onSwitchToLogin(), 2000);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
        <h2>Invalid Reset Link</h2>
        <p style={{ color: 'red' }}>This reset link is invalid or has expired.</p>
        <span onClick={onSwitchToLogin} style={{ color: 'blue', cursor: 'pointer' }}>
          Back to Login
        </span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button onClick={handleReset} disabled={loading} style={{ width: '100%', padding: '10px' }}>
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </div>
  );
}

export default ResetPassword;