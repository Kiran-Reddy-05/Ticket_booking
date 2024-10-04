import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/');
  };

  return (
    <div className="welcome-page">
      <h2>Welcome, {name}!</h2>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default WelcomePage;
