import React, { useState } from 'react';
import './Settings.css'; // Importing the CSS file for styling

const Settings = ({ userInfo, onLogout }) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = () => {
    // Check if the current email matches the logged-in user's email
    if (currentEmail === userInfo.email) {
      // Call the logout function passed from the parent component
      onLogout();
    } else {
      // Display an error message if the email does not match
      setErrorMessage('Please enter your current email to logout.');
    }
  };

  return (
    <div className="settings-container">
      <h2 className="settings-header">Settings</h2>
      <p>Welcome, {userInfo.email}</p>
      <div className="settings-form">
        <input
          className="settings-input"
          type="email"
          placeholder="Enter your current email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
        />
        <button className="settings-button" onClick={handleLogout}>Logout</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Settings;
