import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/login/', {
      username,
      password,
    })
    .then(response => {
      // Assuming the server returns a token or session info
      console.log('Login successful:', response.data);
      navigate('/create-task');
    })
    .catch(error => {
      setError('Login failed. Please check your credentials.');
      console.error('There was an error logging in!', error);
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default Login;
