import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState('login');

  // Check if URL has reset token — show reset password page
  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get('token');

  const handleLogin = (receivedToken) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
    setPage('login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setPage('login');
  };

  // If URL has reset token, show reset password page
  if (resetToken) {
    return <ResetPassword onSwitchToLogin={() => {
      window.history.pushState({}, '', '/'); // remove token from URL
      setPage('login');
    }} />;
  }

  // If logged in, show dashboard
  if (token) {
    return <Dashboard token={token} onLogout={handleLogout} />;
  }

  // Show correct auth page
  if (page === 'register') {
    return <Register onSwitchToLogin={() => setPage('login')} />;
  }

  if (page === 'forgot') {
    return <ForgotPassword onSwitchToLogin={() => setPage('login')} />;
  }

  return (
    <Login
      onLogin={handleLogin}
      onSwitchToRegister={() => setPage('register')}
      onForgotPassword={() => setPage('forgot')}
    />
  );
}

export default App;