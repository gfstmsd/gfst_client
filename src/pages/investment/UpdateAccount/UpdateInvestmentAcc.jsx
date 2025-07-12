import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import api from '../../../api';

function UpdateInvestmentAcc() {
  const { accountNo } = useParams(); // Get account number from URL
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    email: '',
    mobileNo: '',
    AadharNo: '',
    Address: '',
    loanAmount: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await api.get(`/api/investment/${accountNo}`);
        setAccountDetails(response.data.data); // Populate form fields with existing data
      } catch (err) {
        setError('Error fetching account details');
        console.error(err);
      }
    };

    fetchAccountDetails();
  }, [accountNo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setError(null);
    setLoading(true);
    try {
      await api.put(`/api/investment/${accountNo}`, accountDetails);
      alert('Account updated successfully');
      navigate(`/account/${accountNo}`); // Redirect back to the profile page after update
    } catch (err) {
      console.error('Error updating account:', err);
      setError('Error updating account');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Investment Account</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={accountDetails.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={accountDetails.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Mobile No:</label>
        <input
          type="text"
          name="mobileNo"
          value={accountDetails.mobileNo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Aadhar No:</label>
        <input
          type="text"
          name="AadharNo"
          value={accountDetails.AadharNo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="Address"
          value={accountDetails.Address}
          onChange={handleInputChange}
        />
      </div>
      {/* <div>
        <label>Investment Amount:</label>
        <input
          type="text"
          name="investmentAmount"
          value={accountDetails.investmentAmount}
          onChange={handleInputChange}
        />
      </div> */}
      <button type="submit">Update Account</button>
    </form>
    {showConfirm && (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', minWidth: 300, textAlign: 'center' }}>
          <p>Are you sure you want to proceed?</p>
          <button onClick={handleConfirm} style={{ marginRight: 12 }}>Yes</button>
          <button onClick={() => setShowConfirm(false)}>No</button>
        </div>
      </div>
    )}
  );
}

export default UpdateInvestmentAcc;
