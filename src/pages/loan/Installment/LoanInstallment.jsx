import React, { useState } from 'react';
import api from '../../../api';
import './LoanInstalment.css';
import logo from '../../../assets/icons/logo.svg';

const LoanInstallment = () => {
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [deposit, setDeposit] = useState('');
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [emiAmount, setEMIAmount] = useState(''); // ✅ Fixed: Added missing state
  const [remarks, setRemarks] = useState('emi');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const depositAmount = parseFloat(deposit);
    const remainingLoan = parseFloat(loanAmount) - depositAmount;

    if (depositAmount <= 0) {
      setError('Deposit amount must be greater than 0.');
      return;
    }

    if (depositAmount > parseFloat(loanAmount)) {
      setError('Deposit amount cannot exceed the loan balance.');
      return;
    }

    try {
      const response = await api.post('/api/transaction/emi', {
        accountNo: account,
        amount: depositAmount,
        remarks,
      });

      if (response.data.success) {
        alert('Transaction successful!');

        printSlip(accountName, depositAmount, remainingLoan, date);

        setAccount('');
        setDate(new Date().toISOString().split('T')[0]);
        setDeposit('');
        setRemarks('emi');
        setError(null);
        setIsVerified(false);
        setAccountName('');
        setEMIAmount('');
        setLoanAmount('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Transaction Error:", err);
      if (err.response) {
        setError(err.response.data.message || 'Server error occurred.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  const handleVerify = async () => {
    if (!account.trim()) {
      setError('Please enter a valid account number.');
      return;
    }

    try {
      const response = await api.get(`/api/loan/${account}`);
      if (response.data.success) {
        setIsVerified(true);
        setAccountName(response.data.data.name);
        setEMIAmount(response.data.data.emiAmount);
        setLoanAmount(response.data.data.loanAmount);
        setError(null);
      } else {
        setIsVerified(false);
        setAccountName('');
        setEMIAmount('');
        setLoanAmount('');
        setError('Account does not exist.');
      }
    } catch (err) {
      console.error("Verification Error:", err);
      setIsVerified(false);
      setAccountName('');
      setEMIAmount('');
      setLoanAmount('');
      setError('Error verifying account. Please try again.');
    }
  };

  const printSlip = (consumerName, paymentAmount, remainingLoanAmount, date) => {
    const slipContent = `
      <html>
      <head>
        <title>EMI Payment Slip</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt-container { border: 2px solid #000; padding: 20px; width: 400px; margin: auto; border-radius: 8px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); }
          h2 { margin-bottom: 5px; }
          p { margin: 5px 0; font-size: 16px; }
          .bold { font-weight: bold; }
          .logo { max-width: 100px; margin-bottom: 10px; }
          .footer { margin-top: 15px; padding-top: 10px; border-top: 1px solid #000; font-size: 14px; }
          .signature { margin-top: 20px; text-align: left; font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <img src="${logo}" alt="Trust Logo" class="logo" onerror="this.style.display='none'" />
          <h2>Golden Future Supportive Trust</h2>
          <h3>Loan EMI Payment Slip</h3>
          <p><span class="bold">Consumer Name:</span> ${consumerName}</p>
          <p><span class="bold">EMI Payment Amount:</span> ₹${paymentAmount}</p>
          <p><span class="bold">Remaining Loan Amount:</span> ₹${remainingLoanAmount}</p>
          <p><span class="bold">Date:</span> ${date}</p>
          <div class="footer">
            <p><span class="bold">Contact Details</span></p>
            <p>Email: gfcsmsd@gmail.com</p>
            <p>Phone: +91 7029121433</p>
            <p>Address: Vill-Mukundabag, P.O-Kiriteswari, P.S-Jiaganj, Pin-742104, Dist-Murshidabad</p>
          </div>
          <br/><br/>
          <div class="signature">
            <p><span class="bold">Authorized Signature:</span> ____________________</p>
          </div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(slipContent);
    newWindow.document.close();
  };

  return (
    <div className="loan-transaction-container">
      <form onSubmit={handleSubmit} className="loan-transaction-form">
        <h2 className="form-title">Loan EMI Payment</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="account-number">Loan Account Number</label>
          <input
            type="text"
            id="account-number"
            className="form-control"
            placeholder="Enter loan account number"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <button type="button" onClick={handleVerify} className="btn verify-btn">Verify Account</button>
        </div>

        {isVerified && (
          <>
            <div className="verified-info">
              <p>Consumer Name: <strong>{accountName}</strong></p>
              <p>Remaining Loan Amount: <strong>₹ {loanAmount}</strong></p>
              <p>EMI Amount: <strong>₹ {emiAmount}</strong></p>
            </div>

            <div className="form-group">
              <label htmlFor="deposit-amount">EMI Payment (₹)</label>
              <input
                type="number"
                id="deposit-amount"
                className="form-control"
                placeholder="Enter payment amount"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
              />
            </div>

            <button type="submit" className="btn submit-btn">Submit EMI Payment</button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoanInstallment;
