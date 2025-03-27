
import React, { useEffect, useState } from 'react';
import api from '../../../api/index';
import { Link } from 'react-router-dom';
import { formatMongoDate } from '../../../util/FormatDate';
import './Transaction.css';

function MonthlySavingAudit() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const last31Days = new Date(new Date().setDate(new Date().getDate() - 31)).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(last31Days);
  const [endDate, setEndDate] = useState(today);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/transaction/all/savings');
        console.log("Fetched Transactions:", response.data.data);
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        (user.accountNo && user.accountNo.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.transactionId && user.transactionId.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.remarks && user.remarks.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.typeOfTransaction && user.typeOfTransaction.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Date filter
    if (startDate && endDate) {
      filtered = filtered.filter((user) => {
        if (!user.createdAt) return false;
        const userDate = new Date(user.createdAt).getTime();
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return userDate >= start && userDate <= end;
      });
    }

    setFilteredUsers(filtered);
  }, [searchQuery, startDate, endDate, users]);


  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContents = document.getElementById('accounts-table').outerHTML;
    printWindow.document.write(`
      <html>
      <head>
        <title>List of Savings Accounts Transactions</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 6px; text-align: center; }
          th { background-color: #f4f4f4; }
          a { text-decoration: none; color: black; }
        </style>
      </head>
      <body>
        <h2>List of Savings Transactions</h2>
        ${printContents}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="audit-container">
      <h1 className="title">List of Savings Transactions</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by Account No / Transaction ID / Remarks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control search-input"
        />
        <div className="date-filters">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover" id="accounts-table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Account No</th>
              <th>Transaction ID</th>
              <th>Deposit</th>
              <th>Withdraw</th>
              <th>Remarks</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><Link to={`/app/savings/account/${user.accountNo || ''}`}>{user.accountNo || 'N/A'}</Link></td>
                  <td>{user.transactionId || 'N/A'}</td>
                  {/* <td>{user.typeOfTransaction === 'deposit' ? user.amount || 0 : ''}</td>
                  <td>{user.typeOfTransaction === 'withdraw' ? user.amount || 0 : ''}</td> */}
                  {/* <td>{user.typeOfTransaction === 'deposit' || user.typeOfTransaction === 'transfer_credit' ? user.amount : ""}</td>
                  <td> {user.typeOfTransaction === 'withdraw' || user.typeOfTransaction === 'transfer_debit' ? user.amount : ""}</td> */}
                  <td>{['deposit', 'transfer_credit'].includes(user.typeOfTransaction) ? user.amount || 0 : ""}</td>
                  <td>{['withdraw', 'transfer_debit'].includes(user.typeOfTransaction) ? user.amount || 0 : ""}</td>
                  <td>{user.remarks || 'N/A'}</td>
                  <td>{user.createdAt ? formatMongoDate(user.createdAt) : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="print-btn-container">
        <button type="button" className="btn print-btn" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}

export default MonthlySavingAudit;
