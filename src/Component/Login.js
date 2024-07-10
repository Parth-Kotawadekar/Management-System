import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../Service/Service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    Service.login({ username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token); // Save token in localStorage
        navigate('/gaugeMaster'); // Navigate to the GaugeMaster page
      })
      .catch(err => {
        setError('Invalid username or password');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
