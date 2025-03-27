import React, { useState, useEffect } from 'react';
import './CreateInvestmentAccountForm.css'; // Ensure this is your CSS file
import api from '../../../api';

const CreateInvestmentAccount = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [AadharNo, setAadharNo] = useState('');
  const [Address, setAddress] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [error, setError] = useState(null);

  // Set the default date when the component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
    setDate(formattedDate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!date || !name || !email || !mobileNo || !AadharNo || !Address || !investmentAmount) {
      setError('Please fill in all fields.');
      return;
    }
    // Mobile number validation (must be 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }
  // Aadhar number validation (must be 12 digits)
  const aadharRegex = /^\d{12}$/;
  if (!aadharRegex.test(AadharNo)) {
    setError('Aadhar number must be exactly 12 digits.');
    return;
  }
   // Email validation (basic email pattern)
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     setError('Please enter a valid email address.');
     return;
   }
   
   const investmentAmountNum = parseFloat(investmentAmount);
   if (investmentAmountNum <= 0) {
     setError("Loan amount must be greater than zero.");
     return;
   }

    api.post('/api/investment/create-account', { date, name, email, mobileNo, AadharNo, Address, investmentAmount })
      .then(result => {
        console.log(result);
        alert('Account created successfully!');

        // Clear form fields after successful submission
        setDate('');
        setName('');
        setMobileNo('');
        setAadharNo('');
        setAddress('');
        setEmail('');
        setInvestmentAmount('');
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('An error occurred while creating the account.');
      });
  };

  return (
    <div className='update-account-container'>
      <h2>Create Investment Account</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="error">{error}</p>}
        
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Consumer Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Aadhar No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Aadhar Number"
            value={AadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Investment Amount</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Investment Amount"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateInvestmentAccount;
