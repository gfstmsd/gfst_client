

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/transaction/close-investment', {
        accountNo: account,
        amount: accountBalance,
      });

      if (response.data.success) {
        alert('Investment account closed successfully!');

        // Generate the print slip for account closure
        printSlip(accountName, accountBalance, date);

        // Clear form fields after successful submission
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
      <head><title>Investment Account Closure Slip</title></head>
      <body>
        <h1>Youth Supportive Society</h1>
        <p>Consumer Name: <strong>${consumerName}</strong></p>
        <p>Closing Balance: <strong>₹ ${closeInvesment}</strong></p>
        <p>Date: <strong>${date}</strong></p>
        <script>
          window.print();
        </script>
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(slipContent);
    newWindow.document.close(); // Close document to make the print window available
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

            <button type="submit" className="btn submit-btn">
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CloseInvestmentAcc;
