
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/index';
import './AccountProfile.css';
import { formatMongoDate } from '../../../util/FormatDate';

function AccountProfile() {
  const { accountNo } = useParams();
  const [accountDetails, setAccountDetails] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        console.log("Fetching account details for:", accountNo);
        const response = await api.get(`/api/savings/${accountNo}`);
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
        const response = await api.get(`/api/transaction/${accountNo}`);
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
    const accountProfile = document.getElementById('account-profile').cloneNode(true);
    const buttons = accountProfile.querySelectorAll('.print-btn, .update-btn, .delete-btn');
    buttons.forEach(button => button.remove());

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Savings Account Profile</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${accountProfile.outerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDelete = () => navigate(`/app/savings/account/delete/${accountNo}`);
  const handleUpdate = () => navigate(`/app/savings/account/update/${accountNo}`);

  if (error) return <p>{error}</p>;
  if (Object.keys(accountDetails).length === 0) return <p>Loading account details...</p>;

  return (
    <div className="account-profile-container" id="account-profile">
      <h1>Golden Future Supportive Trust</h1>      
      <div className="account-details">
        <p>Savings Account No: <strong>{accountDetails.accountNo}</strong></p>
        <p>Name: <strong>{accountDetails.name}</strong></p>
        <p>Email: <strong>{accountDetails.email}</strong></p>
        <p>Mobile: <strong>{accountDetails.mobileNo}</strong></p>
        <p>Aadhar: <strong>{accountDetails.AadharNo}</strong></p>
        <p>Address: <strong>{accountDetails.Address}</strong></p>
        <p>Date of Birth: <strong>{formatMongoDate(accountDetails.dob)}</strong></p>
        <p>Available Balance: ₹<strong>{accountDetails.balance}</strong></p>     
      </div>
      <h3>Transaction History</h3>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{formatMongoDate(transaction.createdAt)}</td>
              <td>{transaction.transactionId}</td>
              <td>{transaction.typeOfTransaction === 'deposit' || transaction.typeOfTransaction === 'transfer_credit' ? transaction.amount : ""}</td>
              <td> {transaction.typeOfTransaction === 'withdraw' || transaction.typeOfTransaction === 'transfer_debit' ? transaction.amount : ""}</td>
              <td>{transaction.remarks}</td>
            </tr>
          )) : <tr><td colSpan="5">No transactions available</td></tr>}
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

export default AccountProfile;
