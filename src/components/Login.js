import { useState } from 'react';

const API = 'https://urlshortener-production-7d46.up.railway.app';

function Login({ onLogin, onSwitchToRegister, onForgotPassword}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      onLogin(data.token);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '10px' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
      <span onClick={onForgotPassword} style={{ color: 'blue', cursor: 'pointer' }}>
       Forgot Password?
      </span>
      </p>



      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account?{' '}
        <span onClick={onSwitchToRegister} style={{ color: 'blue', cursor: 'pointer' }}>
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;