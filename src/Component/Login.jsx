import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Hard-coded credentials
    const validUsername = 'admin';
    const validPassword = 'admin@123';

    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      navigate("/menu"); // Navigate to the dashboard or main page
    } else {
      alert('Enter Correct Credentials');
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div><h1>Login</h1></div>
        <div>
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
