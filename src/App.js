import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (receivedToken) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // If logged in, show dashboard
  if (token) {
    return <Dashboard token={token} onLogout={handleLogout} />;
  }

  // If not logged in, show login or register
  return (
    <div>
      {showRegister ? (
        <Register onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;