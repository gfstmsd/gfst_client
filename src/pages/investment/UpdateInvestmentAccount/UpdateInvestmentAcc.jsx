import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/index';
import './UpdateInvestmentAcc.css'; 

function UpdateLoanAcc() {
  const { accountNo } = useParams(); 
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    email: '',
    mobileNo: '',
    AadharNo: '',
    Address: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await api.get(`/api/investment/${accountNo}`);
        setAccountDetails(response.data.data); 
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
      navigate(`/app/investment/account/${accountNo}`); 
    } catch (err) {
      console.error('Error updating account:', err);
      setError('Error updating account');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="update-account-container">
      <h2 className="text-center">Update Savings Account</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={accountDetails.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={accountDetails.email}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={accountDetails.mobileNo}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhar No:</label>
          <input
            type="text"
            name="AadharNo"
            value={accountDetails.AadharNo}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            value={accountDetails.Address}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Update Account</button>
      </form>
    </div>
  );
}

export default UpdateLoanAcc;
