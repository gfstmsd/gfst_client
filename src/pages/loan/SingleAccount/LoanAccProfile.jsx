
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api';
import './Profile.css';
import { formatMongoDate } from '../../../util/FormatDate';

function LoanAccProfile() {
  const { accountNo } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        console.log("Fetching loan account details for:", accountNo);
        const response = await api.get(`/api/loan/${accountNo}`);
        console.log("API Response:", response.data);
        setAccountDetails(response.data.data);
      } catch (err) {
        setError('Error fetching account details');
        console.error("API Error:", err);
      }
    };
    if (accountNo) fetchAccountDetails();
  }, [accountNo]);

  useEffect(() => {
    if (!accountNo) return;
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transactions for:", accountNo);
        const response = await api.get(`/api/transaction/type/${accountNo}`, {
          params: { type: ['loan', 'emi'] }
        });
        console.log("Transaction API Response:", response.data);
        setTransactions(response.data.data);
      } catch (error) {
        setError('Error fetching transactions');
        console.error("Transaction API Error:", error);
      }
    };
    fetchTransactions();
  }, [accountNo]);

  const handlePrint = () => {
    const printContents = document.getElementById('account-profile').outerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Loan Account Profile</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .print-btn, .update-btn, .delete-btn { display: none !important; }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDelete = () => navigate(`/app/loan/account/delete/${accountNo}`);
  const handleUpdate = () => navigate(`/app/loan/account/update/${accountNo}`);

  if (error) return <p>{error}</p>;
  if (!accountDetails) return <p>Loading account details...</p>;

  return (
    <div className="account-profile-container" id="account-profile">
      <h1>Golden Future Supportive Trust</h1>     
      <div className="account-details">
        <p>Loan Account No: <strong>{accountDetails.accountNo}</strong></p>
        <p>Name: <strong>{accountDetails.name}</strong></p>
        <p>Email: <strong>{accountDetails.email}</strong></p>
        <p>Mobile: <strong>{accountDetails.mobileNo}</strong></p>
        <p>Aadhar: <strong>{accountDetails.AadharNo}</strong></p>
        <p>Address: <strong>{accountDetails.Address}</strong></p>
        <p>Initial Loan Amount: ₹<strong>{accountDetails.initialLoanAmount}</strong></p>
        <p>Remaining Loan Amount: ₹<strong>{accountDetails.loanAmount}</strong></p>
        <p>Time Period: <strong>{accountDetails.timePeriod} months</strong></p>
        <p>EMI Amount: ₹<strong>{accountDetails.emiAmount}</strong></p>
      </div>
      <h3>Transaction History</h3>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>EMI</th>
            <th>Loan Taken</th>
            <th>Time Period (Months)</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{formatMongoDate(transaction.createdAt)}</td>
              <td>{transaction.transactionId}</td>
              <td>
                {transaction.typeOfTransaction && transaction.typeOfTransaction.toLowerCase() === 'emi'
                  ? `₹${transaction.amount}`
                  : ""}
              </td>
              <td>
                {transaction.typeOfTransaction && transaction.typeOfTransaction.toLowerCase() === 'loan'
                  ? `₹${transaction.amount}`
                  : ""}
              </td>
              <td>{transaction.timePeriod || accountDetails.timePeriod || "N/A"}</td>
              <td>{transaction.remarks}</td>
            </tr>
          )) : <tr><td colSpan="6">No transactions available</td></tr>}
        </tbody>
      </table>
      <div className="action-buttons">
        <button onClick={handlePrint} className="print-btn">Print</button>
        <button onClick={handleUpdate} className="update-btn">Update</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default LoanAccProfile;