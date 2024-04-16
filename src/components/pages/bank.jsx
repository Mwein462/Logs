import React, { useState } from 'react';
import './Bank.css';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Bank = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const tableData = [
    { bankName: 'TD Bank', balance: '$2976', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 238 },
    { bankName: 'Goldman Sachs, Inc.', balance: '$3061', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 225 },
    { bankName: 'Wells Fargo', balance: '$8565', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 281 },
    { bankName: 'NatWest', balance: '$5000', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 250 },
    { bankName: 'Barclays', balance: '$4000', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 400 },
    { bankName: 'Scotiabank', balance: '$3500', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 275 },
    { bankName: 'Royal Bank of Canada', balance: '$4200', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 300 },
    { bankName: 'Bank of Montreal', balance: '$3900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 320 }
  ];
  

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterData(value, selectedCountry);
  };

  const handleCountrySelectChange = (e) => {
    const { value } = e.target;
    setSelectedCountry(value);
    filterData(searchQuery, value);
  };

  const filterData = (query, country) => {
    let filteredData = tableData;

    if (country && country !== 'All countries') {
      filteredData = filteredData.filter(item => item.country.toLowerCase() === country.toLowerCase());
    }

    if (query) {
      filteredData = filteredData.filter(item => 
        Object.values(item).some(val => typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setFilteredData(filteredData);
  };

  const handlePurchaseButtonClick = (bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
    // Add the selected bank item to the cartItems state
    setCartItems([...cartItems, { ...bank, source: 'bank' }]);
  };
  
  

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  const viewCart = () => {
    setIsModalOpen(false);
    navigate('/shoppingcart', { state: { cartItems: cartItems } }); // Navigate to the shopping cart page with cartItems state
  };

  return (
    <div className="bank-container">
      <h2>Multiple Bank Logs available</h2>
      <p>Live bank logs, All logs come with FULL NAME, SSN, PHONE NUMBERS, and ADDRESS.</p>
      <div className="search-container">
        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchInputChange} />
        <select value={selectedCountry} onChange={handleCountrySelectChange}>
          <option value="All countries">All countries</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>BANK NAME</th>
              <th>BALANCE</th>
              <th>INCLUDES</th>
              <th>COUNTRY</th>
              <th>ADDRESS</th>
              <th>SSN/DOB</th>
              <th>PURCHASE</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.bankName}</td>
                <td>{item.balance}</td>
                <td>{item.includes}</td>
                <td>{item.country}</td>
                <td>{item.address}</td>
                <td>{item.ssnDob}</td>
                <td>
                  <button onClick={() => handlePurchaseButtonClick(item)}>Purchase ${item.purchasePrice}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No such data found in the table section.</p>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedBank && selectedBank.bankName}</h2>
            <p>BALANCE: {selectedBank && selectedBank.balance}</p>
            <p>INCLUDES: {selectedBank && selectedBank.includes}</p>
            <p>COUNTRY: {selectedBank && selectedBank.country}</p>
            <p>ADDRESS: {selectedBank && selectedBank.address}</p>
            <p>SSN/DOB: {selectedBank && selectedBank.ssnDob}</p>
            <p>PURCHASE PRICE: {selectedBank && selectedBank.purchasePrice}</p>
            <button onClick={viewCart}>View Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bank;
