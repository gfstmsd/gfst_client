
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import { formatMongoDate } from '../../../util/FormatDate';
import './MonthlyInvestmentAudit.css';

function MonthlyInvestmentAudit() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Default date range (last 31 days)
  const today = new Date().toISOString().split('T')[0];
  const last31Days = new Date(new Date().setDate(new Date().getDate() - 31)).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(last31Days);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/transaction/all/investment');

        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;


    if (searchQuery) {
      filtered = filtered.filter(user =>
        (user.accountNo && user.accountNo.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.transactionId && user.transactionId.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.remarks && user.remarks.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(user => {
        const userDate = new Date(user.createdAt).setHours(0, 0, 0, 0);
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return userDate >= start && userDate <= end;
      });
    }

    setFilteredUsers(filtered);
  }, [searchQuery, startDate, endDate, users]);

  const handlePrint = () => {
    window.print();
  };



  return (
    <div className="audit-container">
      <h1 className="title">List of Investment Transactions</h1>

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

      <div id="accounts-table" className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Account No</th>
              <th>Transaction ID</th>
              <th>Investment Taken</th>
              <th>Profit</th>
              <th>Investment Return</th>
              <th>Remarks</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><Link to={`/app/investment/account/${user.accountNo}`}>{user.accountNo}</Link></td>
                  <td>{user.transactionId}</td>
                  <td>{user.typeOfTransaction === 'investment' ? user.amount : ""}</td>
                  <td>{user.typeOfTransaction === 'profit' ? user.amount : ""}</td>
                  <td>{user.typeOfTransaction === 'closeinvestment' ? user.amount : ""}</td>
                  <td>{user.remarks}</td>
                  <td>{formatMongoDate(user.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No transactions found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      <div className="print-btn-container">
        <button type="button" className="print-btn" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}

export default MonthlyInvestmentAudit;
