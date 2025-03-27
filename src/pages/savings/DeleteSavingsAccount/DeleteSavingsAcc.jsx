import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/index';
import './DeleteSavingsAcc.css'; // Add a separate CSS file for custom styling

function DeleteSavingsAcc() {
  const { accountNo } = useParams();  
  const [AadharNo, setAadharNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAadharChange = (e) => {
    setAadharNo(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const accountDetails = await api.get(`/api/savings/${accountNo}`);

      if (accountDetails.data.data.AadharNo === AadharNo) {
        await api.delete(`/api/savings/${AadharNo}`);
        alert('Account deleted successfully.');
        navigate('/app/savings/all');
      } else {
        setError('Aadhar number does not match the account.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Error deleting account.');
    }
  };

  return (
    <div className="delete-account-container">
      <h2 className="text-center">Delete Savings Account</h2>
      <p className="text-center">To delete the account, please enter the Aadhar number associated with it.</p>

      {error && <p className="error-text text-danger text-center">{error}</p>}

      <div className="form-group">
        <label>Aadhar Number:</label>
        <input
          type="text"
          value={AadharNo}
          onChange={handleAadharChange}
          className="form-control"
          placeholder="Enter Aadhar No"
        />
      </div>

      <button onClick={handleDelete} className="btn btn-danger btn-block mt-3">Confirm Delete</button>
    </div>
  );
}

export default DeleteSavingsAcc;
