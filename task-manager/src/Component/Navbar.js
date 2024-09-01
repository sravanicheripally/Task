import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (for example, by checking a token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage and update the state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to the login page after logging out
  };


  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/create-task">Create Task</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>

      </ul>
    </nav>
  );
};

export default Navbar;
