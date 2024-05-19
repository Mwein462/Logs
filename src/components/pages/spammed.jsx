import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Spammed.css';

const Spammed = () => {
  const initialSampleData = [
    { type: 'Debit', bin: '422426**********', expire: '12/25', country: 'USA', state: 'California', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '437877**********', expire: '11/25', country: 'UK', state: 'London', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '485668**********', expire: '10/25', country: 'Canada', state: 'Ontario', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '423789**********', expire: '09/25', country: 'Canada', state: 'Quebec', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '567890**********', expire: '08/25', country: 'Canada', state: 'British Columbia', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '654321**********', expire: '07/25', country: 'USA', state: 'Texas', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '654322**********', expire: '06/25', country: 'USA', state: 'Florida', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '654323**********', expire: '05/25', country: 'USA', state: 'New York', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '654324**********', expire: '04/25', country: 'USA', state: 'Illinois', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '654325**********', expire: '03/25', country: 'USA', state: 'Pennsylvania', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '654326**********', expire: '02/25', country: 'USA', state: 'Ohio', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '654327**********', expire: '01/25', country: 'USA', state: 'Georgia', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '654328**********', expire: '05/25', country: 'USA', state: 'North Carolina', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '654329**********', expire: '11/24', country: 'USA', state: 'Michigan', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '765432**********', expire: '09/24', country: 'Canada', state: 'Alberta', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '765433**********', expire: '08/24', country: 'Canada', state: 'Manitoba', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '765434**********', expire: '07/24', country: 'Canada', state: 'New Brunswick', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '765435**********', expire: '06/24', country: 'Canada', state: 'Nova Scotia', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '765436**********', expire: '05/24', country: 'Canada', state: 'Prince Edward Island', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '765437**********', expire: '04/24', country: 'Canada', state: 'Saskatchewan', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '765438**********', expire: '03/24', country: 'Canada', state: 'Newfoundland and Labrador', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '765439**********', expire: '02/24', country: 'Canada', state: 'Nunavut', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '876543**********', expire: '01/24', country: 'UK', state: 'Scotland', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '876544**********', expire: '12/23', country: 'UK', state: 'Wales', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '876545**********', expire: '11/23', country: 'UK', state: 'Northern Ireland', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '876546**********', expire: '10/23', country: 'UK', state: 'England', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '876547**********', expire: '09/23', country: 'UK', state: 'Belfast', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '876548**********', expire: '08/23', country: 'UK', state: 'Liverpool', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '876549**********', expire: '07/23', country: 'UK', state: 'Manchester', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Debit', bin: '876550**********', expire: '06/23', country: 'UK', state: 'Birmingham', addressCVV: '***', ssnDOB: '*********' },
    { type: 'Credit', bin: '876551**********', expire: '05/23', country: 'UK', state: 'Leeds', addressCVV: '***', ssnDOB: '*********' }


    
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
