import React from 'react';
import Spammed from './spammed'; // Import Spammed component

import './Cardorder.css';

const Cardorder = () => {
  return (
    <div className="cardorder-container">
      <h4 className="fade-in">Text us on this <a href="https://t.me/cc_order">@Order_card</a></h4>
      <h2 className="bold-heading">CARDORDER.CC</h2>
      <Spammed /> {/* Render Spammed component */}
    </div>
  );
}

export default Cardorder;
