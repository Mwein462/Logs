// Balance.jsx
import React, { useState } from 'react';
import bitcoinIcon from './Bitcoin.webp'; // Import your Bitcoin icon
import './Balance.css';

const Balance = ({ userInfo }) => {
  const [amount, setAmount] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bitcoinAddress, setBitcoinAddress] = useState('');

  const handleMakePayment = () => {
    if (amount.trim() === '') {
      setErrorMessage('Enter a valid amount');
    } else {
      // Simulate generating Bitcoin address (replace this with your actual logic)
      const generatedBitcoinAddress = 'bc1q8nqljfx6s0cewv2vk96zy68ylfa29v2y9h0dtj';
      setBitcoinAddress(generatedBitcoinAddress);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCopyAddress = () => {
    // Logic to copy Bitcoin address to clipboard
    navigator.clipboard.writeText(bitcoinAddress);
  };

  return (
    <div>
      {/* Check if userInfo exists before accessing its properties */}
      {userInfo && (
        <>
          <h2>Welcome, {userInfo.fullName}!</h2>
          <h3>The balance is ${userInfo.balance.toFixed(2)}</h3>

          <div className="input-section">
            <h3>Enter amount to load (USD)</h3>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Enter amount"
            />
          </div>

          <div className="payment-method-section">
            <h3>Select Payment Method</h3>
            <img src={bitcoinIcon} alt="Bitcoin Icon" />
            <button onClick={handleMakePayment}>Make Payment</button>
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          {dialogOpen && (
            <div className="dialog">
              <h3>Payment Instructions</h3>
              <p>Copy the bitcoin address generated below and send ${amount}.</p>
              <p>Any amount sent will appear on your balance within 10 minutes. Please check balance after you send.</p>
              <input 
                type="text" 
                value={bitcoinAddress} 
                readOnly
              />
              <button onClick={handleCopyAddress}>Copy Address</button>
              <button onClick={handleCloseDialog}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Balance;
