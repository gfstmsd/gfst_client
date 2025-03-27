
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api';
import './Profile.css';
import { formatMongoDate } from '../../../util/FormatDate';

function InvestmentAccProfile() {
  const { accountNo } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
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
    if (accountNo) fetchAccountDetails();
  }, [accountNo]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!accountNo) return;
        const response = await api.get(`/api/transaction/type/${accountNo}`, {
          params: {
            type: ['profit', 'closeinvestment', 'investment']
          }
        });
        setTransactions(response.data.data);
      } catch (error) {
        setError('Error fetching transactions');
        console.error(error);
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
        <title>Investment Account Profile</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .print-btn, .update-btn, .delete-btn { display: none !important; }
        </style>
      </head>
      <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  

  const handleDelete = () => navigate(`/app/investment/account/delete/${accountNo}`);
  const handleUpdate = () => navigate(`/app/investment/account/update/${accountNo}`);

  if (error) return <p>{error}</p>;
  if (!accountDetails) return <p>Loading account details...</p>;

  return (
    <div className="account-profile-container" id="account-profile">
       <h1>Golden Future Supportive Trust</h1>
      <div className="account-details">
        <p>Investment Account No: <strong>{accountDetails.accountNo}</strong></p>
        <p>Name: <strong>{accountDetails.name}</strong></p>
        <p>Email: <strong>{accountDetails.email}</strong></p>
        <p>Mobile: <strong>{accountDetails.mobileNo}</strong></p>
        <p>Aadhar: <strong>{accountDetails.AadharNo}</strong></p>
        <p>Address: <strong>{accountDetails.Address}</strong></p>
        <p>Investment Amount: ₹<strong>{accountDetails.investmentAmount}</strong></p>
        <p>Total Profit Return: ₹<strong>{accountDetails.profit}</strong></p>       
      </div>
      <h3>Transaction History</h3>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Investment Amount</th>
            <th>Profit</th>            
            <th>Investment Return</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{formatMongoDate(transaction.createdAt)}</td>
              <td>{transaction.transactionId}</td>             
              <td>{transaction.typeOfTransaction === 'investment' ? transaction.amount : ""}</td>
              <td>{transaction.typeOfTransaction === 'profit' ? transaction.amount : ""}</td>
              <td>{transaction.typeOfTransaction === 'closeinvestment' ? transaction.amount : ""}</td>
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

export default InvestmentAccProfile;
