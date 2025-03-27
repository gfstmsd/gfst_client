
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/index';
import './AllInvestmentAccounts.css';

function InvestmentAccounts() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/investment');
        console.log('API Response:', response.data);
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      return (
        user.accountNo?.toString().includes(searchQuery) ||
        user.AadharNo?.toString().includes(searchQuery) ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContents = document.getElementById('accounts-table').outerHTML;
    
    printWindow.document.write(`
      <html>
      <head>
        <title>List of All Investment Accounts</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 1px; text-align: center; }
          th { background-color: #f2f2f2; }
            a { text-decoration: none; color: black; }
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

  return (
    <>
     
      <h1 className="mb-4">List of Investment Accounts</h1>

      <input
        type="text"
        placeholder="Search by Account Number / Aadhar Number / Consumer Name"
        value={searchQuery}
        onChange={handleSearch}
        className="form-control mb-4 search-bar"
      />

      <div id="accounts-table">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Account No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Aadhar No</th>
              <th>Address</th>
              <th>Investment Amount</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.accountNo}>
                <td>{user.date}</td>
                <td>
                  <Link to={`/app/investment/account/${user.accountNo}`}>{user.accountNo}</Link>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td>{user.AadharNo}</td>
                <td>{user.Address}</td>
                <td>{user.investmentAmount}</td>
                <td>{user.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="print-btn-container">
        <button type="button" className="print-btn" onClick={handlePrint}>Print</button>
      </div>
    </>
  );
}

export default InvestmentAccounts;
