import React, { useEffect, useState } from 'react';
import api from '../../../api/index'; // Import your API instance
import './DonorList.css'; // Import the updated styles

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [error, setError] = useState(null);
  
  const today = new Date().toISOString().split('T')[0];
  const last31Days = new Date(new Date().setDate(new Date().getDate() - 31)).toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState(last31Days);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await api.get('/api/donation');
        console.log('response', response);
        if (response.data.success) {
          setDonors(response.data.data);
          setFilteredDonors(response.data.data);
          setError(null);
        } else {
          setError(response.data.message || 'Failed to load donations.');
        }
      } catch (err) {
        setError('Error fetching donor list. Please try again.');
      }
    };

    fetchDonors();
  }, []);

  useEffect(() => {
    let filtered = donors;
    if (startDate && endDate) {
      console.log("Filtering donations between:", startDate, "and", endDate);
      filtered = filtered.filter((donor) => {
        if (!donor.donationDate) return false;
        const donorDate = new Date(donor.donationDate).getTime();
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return donorDate >= start && donorDate <= end;
      });
    }
    setFilteredDonors(filtered);
  }, [startDate, endDate, donors]);

  return (
    <div className="donor-list-section">
      <h2>Donor List</h2>
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
      
      {filteredDonors.length === 0 ? (
        <p>No donors found.</p>
      ) : (
        <table className="donor-table">
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Address</th>
              <th>Mobile No</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.donorName}</td>
                <td>{donor.donorAddress}</td>
                <td>{donor.donorMobileNo}</td>
                <td>₹{donor.donationAmount}</td>
                <td>{donor.donationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonorList;
