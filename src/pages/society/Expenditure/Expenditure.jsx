

// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoneyBillWave, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
// import api from '../../../api/index'; // Adjust the path according to your project structure
// import './Expenditure.css';

// const Expenditure = () => {
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [expenseDetail, setExpenseDetail] = useState('');
//   const [expenseDate, setExpenseDate] = useState('');
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleExpenseSubmit = async (e) => {
//     e.preventDefault();

//     const newExpense = {
//       expenseDetail,
//       expenseAmount: parseFloat(expenseAmount), // Ensure the amount is a number
//       expenseDate,
//     };

//     try {
//       const response = await api.post('/api/expenditure'); 
      
//       if (response.data.success) {
//         setExpenses([...expenses, newExpense]);
//         setSuccessMessage('Expenditure submitted successfully!');

//         // Clear form inputs after submission
//         setExpenseDetail('');
//         setExpenseAmount('');
//         setExpenseDate('');
//         setError(null);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       setError('An error occurred while submitting the expenditure.');
//     }
//   };

//   return (
//     <div className="expenditure-section">
//       <h2 className="title"><FontAwesomeIcon icon={faFileInvoiceDollar} /> Expenditure</h2>
      
//       <form onSubmit={handleExpenseSubmit} className="expense-form">
//         {error && <p className="error-message">{error}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <div className="form-group">
//           <label htmlFor="expenseDetail">Expense Details</label>
//           <input 
//             id="expenseDetail"
//             type="text" 
//             value={expenseDetail} 
//             onChange={(e) => setExpenseDetail(e.target.value)} 
//             required 
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="expenseAmount">Amount</label>
//           <input 
//             id="expenseAmount"
//             type="number" 
//             value={expenseAmount} 
//             onChange={(e) => setExpenseAmount(e.target.value)} 
//             required 
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="expenseDate">Date</label>
//           <input 
//             id="expenseDate"
//             type="date" 
//             value={expenseDate} 
//             onChange={(e) => setExpenseDate(e.target.value)} 
//             required 
//           />
//         </div>
        
//         <button type="submit" className="submit-button">
//           <FontAwesomeIcon icon={faMoneyBillWave} /> Submit Expenditure
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Expenditure;





// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoneyBillWave, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
// import api from '../../../api/index';
// import './Expenditure.css';

// const Expenditure = () => {
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [expenseDetail, setExpenseDetail] = useState('');
//   const [expenseDate, setExpenseDate] = useState('');
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleExpenseSubmit = async (e) => {
//     e.preventDefault();

//     const newExpense = {
//       expenseDetail,
//       expenseAmount: parseFloat(expenseAmount), // Ensure the amount is a number
//       expenseDate,
//     };

//     try {
//       const response = await api.post('/api/expenditure', newExpense); // Sending newExpense data

//       if (response.data.success) {
//         setExpenses([...expenses, response.data.data]); // Update the expenses list
//         setSuccessMessage('Expenditure submitted successfully!');
        
//         // Clear form inputs after submission
//         setExpenseDetail('');
//         setExpenseAmount('');
//         setExpenseDate('');
//         setError(null);
        
//         // Clear success message after a few seconds
//         setTimeout(() => setSuccessMessage(''), 3000);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       setError('An error occurred while submitting the expenditure.');
//     }
//   };

//   return (
//     <div className="expenditure-section">
//       <h2 className="title"><FontAwesomeIcon icon={faFileInvoiceDollar} /> Expenditure</h2>
      
//       <form onSubmit={handleExpenseSubmit} className="expense-form">
//         {error && <p className="error-message">{error}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <div className="form-group">
//           <label htmlFor="expenseDetail">Expense Details</label>
//           <input 
//             id="expenseDetail"
//             type="text" 
//             value={expenseDetail} 
//             onChange={(e) => setExpenseDetail(e.target.value)} 
//             required 
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="expenseAmount">Amount</label>
//           <input 
//             id="expenseAmount"
//             type="number" 
//             value={expenseAmount} 
//             onChange={(e) => setExpenseAmount(e.target.value)} 
//             required 
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="expenseDate">Date</label>
//           <input 
//             id="expenseDate"
//             type="date" 
//             value={expenseDate} 
//             onChange={(e) => setExpenseDate(e.target.value)} 
//             required 
//           />
//         </div>
        
//         <button type="submit" className="submit-button">
//           <FontAwesomeIcon icon={faMoneyBillWave} /> Submit Expenditure
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Expenditure;



import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faFileInvoiceDollar, faPrint } from '@fortawesome/free-solid-svg-icons';
import api from '../../../api/index'; // Adjust the path according to your project structure
import './Expenditure.css';
import logo from '../../../assets/icons/logo.svg';

const Expenditure = () => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDetail, setExpenseDetail] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseSubmitted, setExpenseSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/expenditure', {
        expenseDetail,
        expenseAmount,
        expenseDate,
      });

      if (response.data.success) {
        setExpenseSubmitted(true);
        setSuccessMessage('Expenditure successfully submitted!');
        setError(null);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(response.data.message || 'Failed to submit expenditure.');
      }
    } catch (err) {
      setError('An error occurred while submitting the expenditure. Please try again.');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContents = `
      <html>
      <head>
        <title>Expenditure Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt-container { border: 2px solid #000; padding: 20px; width: 400px; margin: auto; border-radius: 8px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); }
          h2 { margin-bottom: 5px; }
          p { margin: 5px 0; font-size: 16px; }
          .bold { font-weight: bold; }
          .logo { max-width: 100px; margin-bottom: 10px; }
          .footer { margin-top: 15px; padding-top: 10px; border-top: 1px solid #000; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <img src="${logo}" alt="Trust Logo" class="logo" />
          <h2>Golden Future Supportive Trust</h2>
          <h3>Expenditure Receipt</h3>
          <p><span class="bold">Expense Detail:</span> ${expenseDetail}</p>
          <p><span class="bold">Expense Amount:</span> ₹${expenseAmount}</p>
          <p><span class="bold">Date:</span> ${expenseDate}</p>
          <div class="footer">
            <p><span class="bold">Contact Details</span></p>
            <p>Email: gfcsmsd@gmail.com</p>
            <p>Phone: 7029121433</p>
            <p>Address: Vill-Mukundabag, P.O-Kiriteswari, P.S-Jiaganj, Pin-742104, Dist-Murshidabad</p>
            <br/>
            <br/>
          </div>
            <div class="signature">
            <p><span class="bold">Authorized Signature:</span> ____________________</p>
          </div>
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
    <div className="expenditure-section">
      <h2><FontAwesomeIcon icon={faFileInvoiceDollar} /> Expenditure</h2>

      {!expenseSubmitted && (
        <form onSubmit={handleExpenseSubmit} className="expenditure-form">
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Expense Detail:</label>
            <input
              type="text"
              value={expenseDetail}
              onChange={(e) => setExpenseDetail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount (₹):</label>
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faMoneyBillWave} /> Submit Expenditure
          </button>
        </form>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}

      {expenseSubmitted && (
        <div className="expenditure-slip">
          {/* <h3>Golden Future Supportive Trust</h3>
          <img src={logo} alt="Trust Logo" className="logo" />
          <h4>Expenditure Receipt</h4>
          <p><strong>Expense Detail:</strong> {expenseDetail}</p>
          <p><strong>Expense Amount:</strong> ₹{expenseAmount}</p>
          <p><strong>Date:</strong> {expenseDate}</p> */}
          <button onClick={handlePrint} className="print-button"><FontAwesomeIcon icon={faPrint} /> Print Slip </button>
          {/* <div className="footer">
            <p><strong>Contact Details </strong> </p>
            <p>Email: gfcsmsd@gmail.com</p>
            <p>Phone: +91 7029121433</p>
            <p>Address: Vill-Mukundabag, P.O-Kiriteswari, P.S-Jiaganj, Dist-Murshidabad, Pin-742104</p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Expenditure;