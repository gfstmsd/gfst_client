import React, { useEffect, useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/investment/${accountNo}`, accountDetails);
      alert('Account updated successfully');
      navigate(`/account/${accountNo}`); // Redirect back to the profile page after update
    } catch (err) {
      console.error('Error updating account:', err);
      setError('Error updating account');
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
  );
}

export default UpdateInvestmentAcc;
