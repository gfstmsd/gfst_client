

import { useState } from 'react';
import api from '../../../api/index';
import './CloseInvestmentAcc.css';

const CloseInvestmentAcc = () => {
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
   const [closeInvesment, setCloseInvestment] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/transaction/close-investment', {
        accountNo: account,
        amount: accountBalance,
      });
      if (response.data.success) {
        alert('Investment account closed successfully!');
        printSlip(accountName, accountBalance, date);
        setAccount('');
        setDate(new Date().toLocaleDateString());
        setError(null);
        setIsVerified(false);
        setAccountName('');
        setAccountBalance('');
        setCloseInvestment('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred during the account closure.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await api.get(`/api/investment/${account}`);

      if (response.data.success) {
        setIsVerified(true);
        setAccountName(response.data.data.name);
        setAccountBalance(response.data.data.investmentAmount);
        setError(null);
      } else {
        setIsVerified(false);
        setAccountName('');
        setAccountBalance('');
        setError('Investment account does not exist.');
      }
    } catch (err) {
      setIsVerified(false);
      setAccountName('');
      setAccountBalance('');
      setError('Error verifying account. Please try again.');
    }
  };

 // Function to generate the print slip
 const printSlip = (consumerName, closeInvesment, date) => {
  const slipContent = `
  <html>
  <head>
    <title>Investment Account Closure Slip</title>
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
      <h3>Investment Account Closed</h3>
      <p><span class="bold">Account No:</span> ${account}</p>
      <p><span class="bold">Consumer Name:</span> ${consumerName}</p>
      <p><span class="bold">Aadhar No:</span> ${AadharNo}</p>
      <p><span class="bold">Email:</span> ${email}</p>
      <p><span class="bold">Mobile No:</span> ${mobileNo}</p>
      <p><span class="bold">Address:</span> ${Address}</p>
      <p><span class="bold">Investment Amount:</span> ₹${investmentAmount}</p>
      <p><span class="bold">Closing Balance:</span> ₹${closeInvesment}</p>
      <p><span class="bold">Account Closed:</span> ${date}</p>
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
    <div className="close-investment-container">
      <form onSubmit={handleSubmit} className="close-investment-form">
        <h2 className="form-title">Close Investment Amount</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="account-number">Account Number</label>
          <input
            type="text"
            id="account-number"
            className="form-control"
            placeholder="Enter investment account number"
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
                Investment Amount: <strong>₹ {accountBalance}</strong>
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="close-investment">Close Investment(₹)</label>
              <input
                type="number"
                id="close-investment"
                className="form-control"
                placeholder="Enter close investment amount"
                value={closeInvesment}
                onChange={(e) => setCloseInvestment(e.target.value)}
              />
            </div>

            <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Submit'}
            </button>
          </>
        )}
      </form>
      {showConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', minWidth: 300, textAlign: 'center' }}>
            <p>Are you sure you want to close this investment account?</p>
            <button onClick={handleConfirm} style={{ marginRight: 12 }}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseInvestmentAcc;