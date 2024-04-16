import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Spammed.css';

const Spammed = () => {
  const initialSampleData = [
    { type: 'Debit', bin: '123456**********', expire: '12/25', country: 'USA', state: 'California', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '234567**********', expire: '11/25', country: 'UK', state: 'New York', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '345678**********', expire: '10/25', country: 'Canada', state: 'Ontario', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '456789**********', expire: '09/25', country: 'Canada', state: 'Quebec', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '567890**********', expire: '08/25', country: 'Canada', state: 'British Columbia', addressCVV: '***', ssnDOB: '*********' }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sampleData, setSampleData] = useState(initialSampleData);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const renderSecureData = (data) => {
    return data.toString().replace(/\d/g, '•');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterData(selectedType, selectedCountry, event.target.value);
  };

  const filterData = (type, country, query) => {
    let filteredData = initialSampleData;

    if (type) {
      filteredData = filteredData.filter(row => row.type === type);
    }

    if (country) {
      filteredData = filteredData.filter(row => row.country === country);
    }

    filteredData = filteredData.filter(row => 
      row.bin.toLowerCase().includes(query.toLowerCase()) ||
      row.state.toLowerCase().includes(query.toLowerCase()) ||
      row.country.toLowerCase().includes(query.toLowerCase())
    );

    setSampleData(filteredData);
  };

  const resetData = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedCountry('');
    setSampleData(initialSampleData);
  };

  const handleTypeSelectChange = (event) => {
    setSelectedType(event.target.value);
    filterData(event.target.value, selectedCountry, searchQuery);
  };

  const handleCountrySelectChange = (event) => {
    setSelectedCountry(event.target.value);
    filterData(selectedType, event.target.value, searchQuery);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, source: 'spammed' }]);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const viewCart = () => {
    closeModal();
    navigate('/shoppingcart', { state: { cartItems: cartItems } });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'black', fontWeight: 'bold' }}>SPAMMED LIVE CCS</h2>
      <p style={{ color: 'black', fontStyle: 'italic' }}>Insane quality cards. All cards come with NAME and ADDRESS.</p>
      <div>
        <input 
          type="text" 
          style={{ backgroundColor: 'black', color: 'white' }} 
          placeholder="Search bin, state, symbol, or country" 
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
       
        <div>
          <select 
            style={{ backgroundColor: 'grey', color: 'white' }}
            value={selectedType}
            onChange={handleTypeSelectChange}
          >
            <option value="">All</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <div>
          <select 
            style={{ backgroundColor: 'grey', color: 'white' }}
            value={selectedCountry}
            onChange={handleCountrySelectChange}
          >
            <option value="">All</option>
            <option value="UK">UK</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
        <button onClick={resetData}>Reset</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>TYPE</th>
            <th>BIN</th>
            <th>EXPIRE</th>
            <th>COUNTRY</th>
            <th>STATE</th>
            <th>ADDRESS/CVV</th>
            <th>SSN/DOB</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sampleData.length > 0 ? (
            sampleData.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.bin}</td>
                <td>{row.expire}</td>
                <td>{row.country}</td>
                <td>{row.state}</td>
                <td>{renderSecureData(row.addressCVV)}</td>
                <td>{renderSecureData(row.ssnDOB)}</td>
                <td><button onClick={() => addToCart(row)}>Purchase $25</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No such data found in the table section.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Cart Items</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <strong>Type:</strong> {item.type}, <strong>BIN:</strong> {item.bin}, <strong>EXPIRE:</strong> {item.expire}, <strong>COUNTRY:</strong> {item.country}, <strong>STATE:</strong> {item.state}, <strong>ADDRESS/CVV:</strong> {item.addressCVV}, <strong>SSN/DOB:</strong> {item.ssnDOB}
                </li>
              ))}
            </ul>
            <p>Total Price: ${cartItems.length * 25}</p>
            <button onClick={viewCart}>View Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spammed;
