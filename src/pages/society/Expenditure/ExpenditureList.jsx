import React, { useEffect, useState } from 'react';
import api from '../../../api/index'; // Import API instance
import './ExpenditureList.css'; // Import styles

const ExpenditureList = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const last31Days = new Date(new Date().setDate(new Date().getDate() - 31)).toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState(last31Days);
  const [endDate, setEndDate] = useState(today);
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await api.get('/api/expenditure');
        console.log('response', response);

        if (response.data.success) {
          setExpenditures(response.data.data);
          setFilteredExpenditures(response.data.data);
          setError(null);
        } else {
          setError(response.data.message || 'Failed to load expenditures.');
        }
      } catch (err) {
        setError('Error fetching expenditure list. Please try again.');
      }
    };

    fetchExpenditures();
  }, []);

  useEffect(() => {
    let filtered = expenditures;

    if (startDate && endDate) {
      console.log("Filtering expenditures between:", startDate, "and", endDate);
      
      filtered = filtered.filter((expense) => {
        if (!expense.expenseDate) return false;
        const expenseDate = new Date(expense.expenseDate).getTime();
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return expenseDate >= start && expenseDate <= end;
      });
    }

    setFilteredExpenditures(filtered);
  }, [startDate, endDate, expenditures]);

  return (
    <div className="expenditure-list-section">
      <h2>Expenditure List</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="date-filter-container mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control date-input"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control date-input"
        />
      </div>

      {filteredExpenditures.length === 0 ? (
        <p>No expenditures found.</p>
      ) : (
        <table className="expenditure-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Details</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenditures.map((expenditure, index) => (
              <tr key={index}>
                <td>{new Date(expenditure.expenseDate).toLocaleDateString()}</td>
                <td>{expenditure.expenseDetail}</td>
                <td>₹{expenditure.expenseAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenditureList;
