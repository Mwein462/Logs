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
    { bankName: 'Bank of Montreal', balance: '$3900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 320 },
    { bankName: 'Bank of America', balance: '$7200', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 240 },
    { bankName: 'Chase Bank', balance: '$6500', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 290 },
    { bankName: 'Citibank', balance: '$5400', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 245 },
    { bankName: 'PNC Bank', balance: '$6100', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 230 },
    { bankName: 'U.S. Bank', balance: '$5800', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 220 },
    { bankName: 'Capital One', balance: '$4900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 210 },
    { bankName: 'SunTrust Bank', balance: '$4600', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 200 },
    { bankName: 'BB&T Bank', balance: '$4300', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 215 },
    { bankName: 'Regions Bank', balance: '$5200', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 230 },
    { bankName: 'M&T Bank', balance: '$3100', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 185 },
    { bankName: 'Fifth Third Bank', balance: '$3400', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 195 },
    { bankName: 'KeyBank', balance: '$3700', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'USA', address: '*******', ssnDob: '*********', purchasePrice: 205 },
    { bankName: 'HSBC', balance: '$4600', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 300 },
    { bankName: 'Santander UK', balance: '$3800', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 310 },
    { bankName: 'Lloyds Bank', balance: '$4900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 320 },
    { bankName: 'TSB Bank', balance: '$5100', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 330 },
    { bankName: 'Halifax', balance: '$5300', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 340 },
    { bankName: 'Virgin Money', balance: '$3500', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 320 },
    { bankName: 'Yorkshire Bank', balance: '$3700', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 315 },
    { bankName: 'Clydesdale Bank', balance: '$3900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 325 },
    { bankName: 'The Co-operative Bank', balance: '$4100', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 335 },
    { bankName: 'Standard Chartered', balance: '$4300', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 345 },
    { bankName: 'Metro Bank', balance: '$4500', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 355 },
    { bankName: 'Aldermore', balance: '$4700', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 365 },
    { bankName: 'Close Brothers', balance: '$4900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'UK', address: '*******', ssnDob: '*********', purchasePrice: 375 },
    { bankName: 'TD Canada Trust', balance: '$4500', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 320 },
    { bankName: 'CIBC', balance: '$4300', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 310 },
    { bankName: 'National Bank of Canada', balance: '$4100', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 300 },
    { bankName: 'Laurentian Bank of Canada', balance: '$3900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 290 },
    { bankName: 'HSBC Bank Canada', balance: '$3700', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 280 },
    { bankName: 'Canadian Western Bank', balance: '$3500', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 270 },
    { bankName: 'ATB Financial', balance: '$3300', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 260 },
    { bankName: 'First Nations Bank of Canada', balance: '$3100', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 250 },
    { bankName: 'EQ Bank', balance: '$2900', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 240 },
    { bankName: 'Simplii Financial', balance: '$2700', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 230 },
    { bankName: 'Manulife Bank of Canada', balance: '$2500', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 220 },
    { bankName: 'Peoples Trust Company', balance: '$2300', includes: 'Login & Password | Email access | Ip & user agent | SSN', country: 'Canada', address: '*******', ssnDob: '*********', purchasePrice: 210 }

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
