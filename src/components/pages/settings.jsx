import React from 'react';

const Settings = ({ userInfo, onLogout }) => {
  // Check if userInfo is available before accessing its properties
  const userName = userInfo ? userInfo.email : '';

  const handleLogout = () => {
    // Call the logout function passed from the parent component
    onLogout();
  };

  return (
    <div>
      <h2>Settings</h2>
      <p>Welcome, {userName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;
