import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Spammed from './components/pages/spammed';
import Bank from './components/pages/bank';
import Settings from './components/pages/settings';
import Cardorder from './components/pages/Cardorder';
import Support from './components/pages/support';
import Shoppingcart from './components/pages/shoppingcart';
import Balance from './components/pages/balance';
import Signup from './components/pages/Signup';
import axios from 'axios'; // Import axios for API requests

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // Check local storage for authentication data on app load
    const authData = localStorage.getItem('authData');
    if (authData) {
      const parsedData = JSON.parse(authData);
      setAuthenticated(true);
      setUserInfo(parsedData);
    }
  }, []);

  const handleAuthentication = async (userData) => {
    // Check if userData is not null before proceeding
    if (!userData || !userData.email) {
      console.error('Invalid user data:', userData);
      return;
    }
  
    // Assuming authentication is successful, set authenticated to true
    setAuthenticated(true);
    setUserInfo(userData);
    // Store authentication data in local storage
    localStorage.setItem('authData', JSON.stringify(userData));
  
    // Fetch user information from the server after authentication
    try {
      const res = await axios.get(`https://server-ur97.onrender.com/GetUserInfo/${userData.email}`);
      setUserInfo(res.data); // Update user information with data from the server
    } catch (error) {
      console.error('Error fetching user information:', error);
      // Handle any errors, such as failed API requests
    }
  };

  const handleLogout = () => {
    // Perform logout actions, such as clearing authentication state and user info
    setAuthenticated(false);
    setUserInfo({});
    // Clear authentication data from local storage
    localStorage.removeItem('authData');
  };

  return (
    <div className='App'>
      {authenticated ? (
        <>
          <Navbar userInfo={userInfo} />
          <Routes>
            <Route path='/' element={<Cardorder />} initial={true} />
            <Route path='/spammed' element={<Spammed />} />
            <Route path='/bank' element={<Bank />} />
            
            <Route path='/settings' element={<Settings userInfo={userInfo} onLogout={handleLogout} />} />
            <Route path='/support' element={<Support />} />
            <Route path='/shoppingcart' element={<Shoppingcart />} />
            <Route path='/balance' element={<Balance userInfo={userInfo} />} />
            
            {/* Add a catch-all route for unmatched URLs */}
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Signup onAuthenticate={handleAuthentication} />
      )}
    </div>
  );
}

export default App;
