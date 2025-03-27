import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faDonate, faPrint } from '@fortawesome/free-solid-svg-icons';
import api from '../../../api/index'; // Import API instance
import './Donation.css'; // Import styles
import logo from '../../../assets/icons/logo.svg'; // Ensure the correct path

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/donation', {
        donorName,
        donationAmount,
        donationDate,
        address,
        mobileNo,
      });

      if (response.data.success) {
        setDonationSubmitted(true);
        setSuccessMessage('Donation successfully submitted!');
        setError(null);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(response.data.message || 'Failed to submit donation.');
      }
    } catch (err) {
      setError('An error occurred while submitting the donation. Please try again.');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContents = `
      <html>
      <head>
        <title>Donation Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt-container { border: 2px solid #000; padding: 20px; width: 400px; margin: auto; border-radius: 8px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); }
          h2 { margin-bottom: 5px; }
          p { margin: 5px 0; font-size: 16px; }
          .bold { font-weight: bold; }
          .logo { max-width: 100px; margin-bottom: 10px; }
          .footer { margin-top: 15px; padding-top: 10px; border-top: 1px solid #000; font-size: 14px; }
          .signature { margin-top: 20px; text-align: left; font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <img src="${logo}" alt="Trust Logo" class="logo" />
          <h2>Golden Future Supportive Trust</h2>
          <h3>Donation Receipt</h3>          
          <h3>Thank you for helping us. </h3>
          <p><span class="bold">Donor Name:</span> ${donorName}</p>
          <p><span class="bold">Donation Amount:</span> ₹${donationAmount}</p>
          <p><span class="bold">Date:</span> ${donationDate}</p>
          <p><span class="bold">Donor Address:</span> ${address}</p>
          <p><span class="bold">Mobile Number:</span> ${mobileNo}</p>
          <div class="footer">
            <p><span class="bold">Contact Details</span> </p>
            <p>Email: gfcsmsd@gmail.com</p>
            <p>Phone:+91 7029121433</p>
            <p>Address: Vill-Mukundabag, P.O-Kiriteswari, P.S-Jiaganj, Pin-742104, Dist-Murshidabad</p>
          </div>
          <br/>
          <br/>
          <div class="signature">
            <p><span class="bold">Authorized Signature:</span> ____________________</p>
          </div>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(printContents);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="donation-section">
      <h2><FontAwesomeIcon icon={faDonate} /> Donation</h2>

      {!donationSubmitted && (
        <form onSubmit={handleDonationSubmit} className="donation-form">
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Donor Name:</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount (₹):</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faHandHoldingHeart} /> Submit Donation
          </button>
        </form>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}

      {donationSubmitted && (
        <div className="donation-slip">
          <button onClick={handlePrint} className="print-button"><FontAwesomeIcon icon={faPrint} /> Print Slip </button>
        </div>
      )}
    </div>
  );
};

export default Donation;