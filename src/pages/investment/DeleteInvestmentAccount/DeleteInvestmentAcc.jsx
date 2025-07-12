import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/index';


function DeleteInvestmentAcc() {
  const { accountNo } = useParams();  
  const [AadharNo, setAadharNo] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const handleAadharChange = (e) => {
    setAadharNo(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setError('');
    setLoading(true);
    try {
      const accountDetails = await api.get(`/api/investment/${accountNo}`);
      if (accountDetails.data.data.AadharNo === AadharNo) {
        await api.delete(`/api/investment/${AadharNo}`);
        setError(''); // Clear any previous error
        alert('Account deleted successfully.');
        navigate('/app/investment/all');
      } else {
        setError('Aadhar number does not match the account.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Error deleting account.');
    } finally {
      setLoading(false);
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
      {showConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', minWidth: 300, textAlign: 'center' }}>
            <p>Are you sure you want to delete this investment account?</p>
            <button onClick={handleConfirm} style={{ marginRight: 12 }}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteInvestmentAcc;
