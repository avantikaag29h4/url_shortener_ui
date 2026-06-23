import { useState } from 'react';

const API = 'https://urlshortener-production-7d46.up.railway.app';

function Register({ onSwitchToLogin }) {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setSuccess('Registered successfully! Please login.');
      setTimeout(() => onSwitchToLogin(), 2000);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <button onClick={handleRegister} disabled={loading} style={{ width: '100%', padding: '10px' }}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} style={{ color: 'blue', cursor: 'pointer' }}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;