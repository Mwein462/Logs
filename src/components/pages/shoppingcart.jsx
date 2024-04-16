import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Shoppingcart.css'; // Import your CSS file

const Shoppingcart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch balance from API or any other source
    // For demonstration purpose, setting balance to 100
    setBalance(0);
  }, []);

  useEffect(() => {
    // Update cart items when location state changes
    setCartItems(location.state?.cartItems || []);
  }, [location.state]);

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    navigate({ pathname: location.pathname, state: { cartItems: updatedCartItems } });
  };

  const handlePurchase = () => {
    let totalPrice = 0;
    
    if (cartItems.length > 0) {
      // Calculate total price based on the source of items
      totalPrice = cartItems.reduce((acc, item) => {
        if (item.source === 'bank') {
          return acc + item.purchasePrice; // Assuming 'purchasePrice' is the property representing the price in bank.jsx
        } else if (item.source === 'spammed') {
          return acc + 25; // Assuming $25 is the price for items from spammed.jsx
        }
        return acc;
      }, 0);
    }

    if (balance < totalPrice) {
      setErrorMessage('Error: Insufficient balance. You have insufficient balance in your account. Top up and load your account to make the purchase. Tap the button below "Load Account" to be directed to the balance section.');
    } else {
      // Purchase logic
      // Redirect to success page or show success message
      alert('Purchase successful!');
    }
  };

  // Calculate totalPrice here
  let totalPrice = 0;
  if (cartItems.length > 0) {
    totalPrice = cartItems.reduce((acc, item) => {
      if (item.source === 'bank') {
        return acc + item.purchasePrice; // Assuming 'purchasePrice' is the property representing the price in bank.jsx
      } else if (item.source === 'spammed') {
        return acc + 25; // Assuming $25 is the price for items from spammed.jsx
      }
      return acc;
    }, 0);
  }

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="shopping-cart-item">
            {item.source === 'bank' ? (
              <div>
                <strong>Bank Name:</strong> {item.bankName}, <strong>Balance:</strong> {item.balance}
              </div>
            ) : (
              <div>
                <strong>Type:</strong> {item.type}, <strong>BIN:</strong> {item.bin}, <strong>EXPIRE:</strong> {item.expire}, <strong>COUNTRY:</strong> {item.country}, <strong>STATE:</strong> {item.state}, <strong>ADDRESS/CVV:</strong> {item.addressCVV}, <strong>SSN/DOB:</strong> {item.ssnDOB}
              </div>
            )}
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="total-price">Total Price: ${totalPrice}</p>

      <div>
        <h2>Select Payment Method</h2>
        <p>Balance: ${balance.toFixed(2)}</p>
        <button className="purchase-button" onClick={handlePurchase}>Purchase</button>
      </div>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
          <button onClick={() => navigate('/balance')}>Load Account</button>
        </div>
      )}
    </div>
  );
};

export default Shoppingcart;
