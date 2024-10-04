// HomePage.js
import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import './styles.css';

const HomePage = () => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const handleOpenLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Ticket Booking System</h1>
      <button onClick={handleOpenLoginPopup}>Login</button>
      <button>Check Movies</button>
      <button>Check Bookings</button>

      {isLoginPopupOpen && <LoginPopup onClose={handleCloseLoginPopup} />}
    </div>
  );
};

export default HomePage;
