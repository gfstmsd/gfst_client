
import React, { useState } from 'react';
import api from '../../../api/index';
import './Withdraw.css';
import logo from '../../../assets/icons/logo.svg';

const Withdraw = () => {
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [withdraw, setWithdraw] = useState('');
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [remarks, setRemarks] = useState('withdraw');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/transaction/withdraw/', {
        accountNo: account,
        amount: withdraw,
        remarks,
      });
      if (response.data.success) {
        const newBalance = parseFloat(accountBalance) - parseFloat(withdraw);

        alert('Transaction successful!');
        printSlip(accountName, withdraw, newBalance, date);

        setAccount('');
        setDate(new Date().toLocaleDateString());
        setWithdraw('');
        setRemarks('withdraw');
        setError(null);
        setIsVerified(false);
        setAccountName('');
        setAccountBalance('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred during the transaction.');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await api.get(`/api/savings/${account}`);
      if (response.data.success) {
        setIsVerified(true);
        setAccountName(response.data.data.name);
        setAccountBalance(response.data.data.balance);
        setError(null);
      } else {
        setIsVerified(false);
        setAccountName('');
        setAccountBalance('');
        setError('Account does not exist.');
      }
    } catch (err) {
      setIsVerified(false);
      setAccountName('');
      setAccountBalance('');
      setError('Error verifying account. Please try again.');
    }
  };

  const printSlip = (consumerName, withdrawAmount, presentBalance, date) => {
    const slipContent = `
      <html>
      <head>
        <title>Money Withdraw Slip</title>
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
          <img src="${logo}" alt="Trust Logo" class="logo" />
          <h2>Golden Future Supportive Trust</h2>
          <h3>Withdraw Slip</h3>          
          <p><span class="bold">Consumer Name:</span> ${consumerName}</p>
          <p><span class="bold">Withdraw Amount:</span> ₹${withdrawAmount}</p>
          <p><span class="bold">Available Balance:</span> ₹${presentBalance}</p>
          <p><span class="bold">Date:</span> ${date}</p>
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

    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(slipContent);
    newWindow.document.close();
  };

  return (
    <div className="form-wrapper">
      <div className="withdraw-container">
        <form onSubmit={handleSubmit} className="withdraw-form">
          <h2 className="form-title">Withdraw Funds</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="account-number">Account Number</label>
            <input
              type="text"
              id="account-number"
              className="form-control"
              placeholder="Enter savings account number"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <button
              type="button"
              onClick={handleVerify}
              className="btn verify-btn"
            >
              Verify Account
            </button>
          </div>

          {isVerified && (
            <>
              <div className="verified-info">
                <p>
                  Consumer Name: <strong>{accountName}</strong>
                </p>
                <p>
                  Present Balance: <strong>₹ {accountBalance}</strong>
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="withdraw-amount">Withdraw Amount (₹)</label>
                <input
                  type="number"
                  id="withdraw-amount"
                  className="form-control"
                  placeholder="Enter amount to withdraw"
                  value={withdraw}
                  onChange={(e) => setWithdraw(e.target.value)}
                />
              </div>

              <button type="submit" className="btn submit-btn">
                Submit Withdraw
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
