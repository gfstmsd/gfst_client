import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/index';
import './UpdateSavingsAcc.css'; // Create a CSS file for additional custom styles

function UpdateSavingsAcc() {
  const { accountNo } = useParams(); // Get account number from URL
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    email: '',
    mobileNo: '',
    AadharNo: '',
    Address: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await api.get(`/api/savings/${accountNo}`);
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
    if (isSubmitting) return;
    const confirmed = window.confirm('Are you sure you want to proceed?');
    if (!confirmed) return;
    setIsSubmitting(true);
    try {
      await api.put(`/api/savings/${accountNo}`, accountDetails);
      alert('Account updated successfully');
      navigate(`/app/savings/account/${accountNo}`); // Redirect back to the profile page after update
    } catch (err) {
      console.error('Error updating account:', err);
      setError('Error updating account');
      setIsSubmitting(false);
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
        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Update Account</button>
      </form>
    </div>
  );
}

export default UpdateSavingsAcc;
