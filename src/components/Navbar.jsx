import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTelegram, FaShoppingCart } from 'react-icons/fa';
import './Navbar.css'; // Importing CSS file for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
        <div className="hamburger"></div>
      </div>
      <li>
        <Link to="/" className="Title">
          CARDORDER
        </Link>
      </li>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>

        <li>
          <Link to="/">
            <FaTelegram />
          </Link>
        </li>
        <li>
          <Link to="/spammed">Spammed</Link>
        </li>
        <li>
          <Link to="/bank">Bank</Link>
        </li>

        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/support">Support</Link>
        </li>
        <li>
          <span>
            <Link to="/shoppingcart">
              <FaShoppingCart />
            </Link>
            

          </span>
        </li>
        <li>
          <span>
            <Link to="/balance">
              Balance
            </Link>
           
          </span>
        </li>
 
      </ul>
    </nav>
  );
};

export default Navbar;