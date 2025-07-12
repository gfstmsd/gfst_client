import React, { useState, useEffect, useRef } from 'react';
import './CreateInvestmentAccountForm.css'; // Ensure this is your CSS file
import api from '../../../api';
import logo from '../../../assets/icons/logo.svg';

const CreateInvestmentAccount = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [AadharNo, setAadharNo] = useState('');
  const [Address, setAddress] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const isMounted = useRef(true);

  // Set the default date when the component mounts
  useEffect(() => {
    isMounted.current = true;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
    setDate(formattedDate);
    return () => { isMounted.current = false; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setShowConfirm(true);
    setPendingSubmit(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setPendingSubmit(false);
    setError(null);
    setLoading(true);

    if (!date || !name || !email || !mobileNo || !AadharNo || !Address || !investmentAmount) {
      if (isMounted.current) {
        setError('Please fill in all fields.');
        setLoading(false);
      }
      return;
    }
    // Mobile number validation (must be 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      if (isMounted.current) {
        setError('Mobile number must be exactly 10 digits.');
        setLoading(false);
      }
      return;
    }
    // Aadhar number validation (must be 12 digits)
    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(AadharNo)) {
      if (isMounted.current) {
        setError('Aadhar number must be exactly 12 digits.');
        setLoading(false);
      }
      return;
    }
    // Email validation (basic email pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (isMounted.current) {
        setError('Please enter a valid email address.');
        setLoading(false);
      }
      return;
    }
    const investmentAmountNum = parseFloat(investmentAmount);
    if (investmentAmountNum <= 0) {
      if (isMounted.current) {
        setError("Loan amount must be greater than zero.");
        setLoading(false);
      }
      return;
    }

    api.post('/api/investment/create-account', { date, name, email, mobileNo, AadharNo, Address, investmentAmount })
      .then(result => {
        if (!isMounted.current) return;
        console.log(result);
        alert('Account created successfully!');
        printInvestmentSlip(name, AadharNo, mobileNo, Address, date, email, investmentAmount);
        // Clear form fields after successful submission
        setDate('');
        setName('');
        setMobileNo('');
        setAadharNo('');
        setAddress('');
        setEmail('');
        setInvestmentAmount('');
        setError(null);
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Give a moment for the print dialog
      })
      .catch(error => {
        if (!isMounted.current) return;
        console.error(error);
        setError('An error occurred while creating the account.');
        setLoading(false);
      });
  };

  const printInvestmentSlip = (consumerName, AadharNo, mobileNo, Address, date, email, investmentAmount) => {
    const slipContent = `
      <html>
      <head>
        <title>Investment Account Slip</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt-container { border: 2px solid #000; padding: 20px; width: 400px; margin: auto; border-radius: 10px; box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3); background-color: #f9f9f9; }
          h2, h3 { margin-bottom: 8px; }
          p { margin: 6px 0; font-size: 14px; }
          .bold { font-weight: bold; }
          .logo { max-width: 100px; margin-bottom: 10px; }
          .footer { margin-top: 15px; padding-top: 10px; border-top: 1px solid #000; font-size: 12px; text-align: left; }
          .signature { margin-top: 20px; font-size: 14px; text-align: right; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <img src="${logo}" alt="Trust Logo" class="logo" />
          <h2>Golden Future Supportive Trust</h2>
          <h3>Investment Account Created</h3>
          <p><span class="bold">Consumer Name:</span> ${consumerName}</p>
          <p><span class="bold">Aadhar No:</span> ${AadharNo}</p>
          <p><span class="bold">Email:</span> ${email}</p>
          <p><span class="bold">Mobile No:</span> ${mobileNo}</p>
          <p><span class="bold">Address:</span> ${Address}</p>
          <p><span class="bold">Investment Amount:</span> ₹${investmentAmount}</p>
          <p><span class="bold">Account created:</span> ${date}</p>
          <div class="footer">
            <p><span class="bold">Contact Details</span> </p>
            <p>Email: gfcsmsd@gmail.com</p>
            <p>Phone: +91 7029121433</p>
            <p>Address: Vill-Mukundabag, P.O-Kiriteswari, P.S-Jiaganj, Pin-742104, Dist-Murshidabad</p>
          </div>
          <br/>
          <br/>
          <div class="signature">
            <p><span class="bold">Authorized Signature:</span> ____________________</p>
          </div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;
    const newWindow = window.open('', '_blank', 'width=600,height=600');
    newWindow.document.write(slipContent);
    newWindow.document.close();
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
        
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Processing...' : 'Submit'}</button>
      </form>
      {showConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', minWidth: 300, textAlign: 'center' }}>
            <p>Are you sure you want to create this investment account?</p>
            <button onClick={handleConfirm} style={{ marginRight: 12 }}>Yes</button>
            <button onClick={() => { setShowConfirm(false); setPendingSubmit(false); }}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvestmentAccount;
