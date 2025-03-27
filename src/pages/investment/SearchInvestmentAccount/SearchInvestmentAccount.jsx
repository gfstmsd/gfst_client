import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/index';
import './SearchInvestmentAccount.css';

const SearchInvestmentAccount = () => {
  const [accountNo, setAccountNo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/api/investment/${accountNo}`);
      if (response.data && response.data.data) {
        navigate(`/app/investment/account/${accountNo}`);
      } else {
        setError('Account not found.');
      }
    } catch (err) {
      setError('Error fetching account details. Please check the account number.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <h2 className="search-title">Search Investment Account</h2>
        {error && <p className="search-error">{error}</p>}
        
        <div className="search-group">
          <label htmlFor="account-number" className="search-label">Account Number</label>
          <input
            type="text"
            id="account-number"
            className="search-input"
            placeholder="Enter investment account number"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSearch} className="search-btn" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default SearchInvestmentAccount;

