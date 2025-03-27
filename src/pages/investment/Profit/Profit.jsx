
// import React, { useState } from 'react'; 
// import api from '../../../api/index';
// import './Profit.css';

// const Profit = () => {
//   const [account, setAccount] = useState('');
//   const [date, setDate] = useState(new Date().toLocaleDateString());
//   const [profit, setProfit] = useState(''); // For storing the profit amount
//   const [error, setError] = useState(null);
//   const [isVerified, setIsVerified] = useState(false);
//   const [accountName, setAccountName] = useState('');
//   const [accountBalance, setAccountBalance] = useState('');
//   const [investmentAmount, setInvestmentAmount] = useState('');

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await api.post('/api/transaction/profit/', {
//   //       accountNo: account,
//   //       amount: profit,
//   //     });

//   //     if (response.data.success) {
//   //       const newBalance = parseFloat(accountBalance) + parseFloat(profit); // Calculate new balance after profit calculation

//   //       alert('Profit transaction successful!');
//   //       // Generate the print slip with updated balance
//   //       printSlip(accountName, profit, newBalance, date);

//   //       // Clear form fields after successful submission
//   //       setAccount('');
//   //       setDate(new Date().toLocaleDateString());
//   //       setProfit('');
//   //       setError(null);
//   //       setIsVerified(false);
//   //       setAccountName('');
//   //       setAccountBalance('');
//   //       setInvestmentAmount('');
//   //     } else {
//   //       setError(response.data.message);
//   //     }
//   //   } catch (err) {
//   //     setError('An error occurred during the profit calculation.');
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await api.post('/api/transaction/profit/', {
//             accountNo: account,
//             amount: parseFloat(profit) // Ensure amount is a number
//         });

//         if (response.data.success) {
//             alert('Profit transaction successful!');
//             setProfit(''); // Reset input field
//         } else {
//             setError(response.data.message);
//         }
//     } catch (err) {
//         setError('An error occurred during the profit calculation.');
//     }
// };


//   const handleVerify = async () => {
//     try {
//       const response = await api.get(`/api/investment/${account}`);

//       if (response.data.success) {
//         setIsVerified(true);
//         setAccountName(response.data.data.name);
//         setAccountBalance(response.data.data.balance);
//         setInvestmentAmount(response.data.data.investmentAmount)
//         setError(null);
//       } else {
//         setIsVerified(false);
//         setAccountName('');
//         setAccountBalance('');
//         setInvestmentAmount('');
//         setError('Investment account does not exist.');
//       }
//     } catch (err) {
//       setIsVerified(false);
//       setAccountName('');
//       setAccountBalance('');
//       setInvestmentAmount('');
//       setError('Error verifying account. Please try again.');
//     }
//   };

//   // Function to generate the print slip
//   const printSlip = (consumerName, profitAmount, investmentAmount, date) => {
//     const slipContent = `
//       <html>
//       <head><title>Profit  Slip</title></head>
//       <body>
//         <h1>Youth Supportive Society</h1>
//         <p>Consumer Name: <strong>${consumerName}</strong></p>
//         <p>Profit Amount: <strong>₹ ${profitAmount}</strong></p>
//         <p>Investmented Amount: <strong>₹ ${investmentAmount}</strong></p>
//         <p>Date: <strong>${date}</strong></p>
//         <script>
//           window.print();
//         </script>
//       </body>
//       </html>
//     `;

//     const newWindow = window.open('', '_blank', 'width=600,height=400');
//     newWindow.document.write(slipContent);
//     newWindow.document.close(); // Close document to make the print window available
//   };

//   return (
//     <div className="profit-container">
//       <form onSubmit={handleSubmit} className="profit-form">
//         <h2 className="form-title"> Profit funds</h2>
//         {error && <p className="error-message">{error}</p>}

//         <div className="form-group">
//           <label htmlFor="account-number">Account Number</label>
//           <input
//             type="text"
//             id="account-number"
//             className="form-control"
//             placeholder="Enter investment account number"
//             value={account}
//             onChange={(e) => setAccount(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={handleVerify}
//             className="btn verify-btn"
//           >
//             Verify Account
//           </button>
//         </div>

//         {isVerified && (
//           <>
//             <div className="verified-info">
//               <p>
//                 Consumer Name: <strong>{accountName}</strong>
//               </p>
//               <p>
//                 Investmented Amount: <strong>₹ {investmentAmount}</strong>
//               </p>
//             </div>

//             <div className="form-group">
//               <label htmlFor="profit-amount">Profit Amount (₹)</label>
//               <input
//                 type="number"
//                 id="profit-amount"
//                 className="form-control"
//                 placeholder="Enter profit amount"
//                 value={profit}
//                 onChange={(e) => setProfit(e.target.value)}
//               />
//             </div>

//             <button type="submit" className="btn submit-btn">
//               Submit Profit
//             </button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Profit;





import React, { useState } from 'react';
import api from '../../../api/index';
import './Profit.css';
import logo from '../../../assets/icons/logo.svg';
import { formatMongoDate } from '../../../util/FormatDate';

const Profit = () => {
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [profit, setProfit] = useState('');
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profit || isNaN(parseFloat(profit))) {
      setError('Please enter a valid profit amount.');
      return;
    }

    if (parseFloat(profit) <= 0) {
      setError('Profit amount must be greater than zero.');
      return;
    }

    try {
      const response = await api.post('/api/transaction/profit/', {
        accountNo: account,
        amount: parseFloat(profit)
      });

      if (response.data.success) {
        const newBalance = parseFloat(accountBalance) + parseFloat(profit);
        alert('Profit transaction successful!');

        // Generate the print slip
        printSlip(accountName, profit, investmentAmount, newBalance, date);

        // Reset form state
        setAccount('');
        setDate(new Date().toLocaleDateString());
        setProfit('');
        setError(null);
        setIsVerified(false);
        setAccountName('');
        setAccountBalance('');
        setInvestmentAmount('');
      } else {
        setError(response.data.message || 'Transaction failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during the transaction.');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await api.get(`/api/investment/${account}`);

      if (response.data.success) {
        setIsVerified(true);
        setAccountName(response.data.data.name);
        setAccountBalance(response.data.data.balance);
        setInvestmentAmount(response.data.data.investmentAmount);
        setError(null);
      } else {
        setIsVerified(false);
        setAccountName('');
        setAccountBalance('');
        setInvestmentAmount('');
        setError(response.data.message || 'Investment account does not exist.');
      }
    } catch (err) {
      setError('Error verifying account. Please try again.');
      setIsVerified(false);
      setAccountName('');
      setAccountBalance('');
      setInvestmentAmount('');
    }
  };

  // Function to generate the print slip
  const printSlip = (consumerName, profitAmount, investmentAmount, date) => {
    const formattedDate = formatMongoDate(date); // Format the date properly

    const slipContent = `
      <html>
      <head>
        <title>Profit Transaction Slip</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt-container { 
            border: 2px solid #000; padding: 20px; width: 400px; margin: auto; 
            border-radius: 8px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); 
          }
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
          <h3>Profit Transaction Slip</h3>   
          <p><span class="bold">Consumer Account:</span> </p>
          <p><span class="bold">Consumer Name:</span> ${consumerName}</p>
          <p><span class="bold">Invested Amount:</span> ₹${investmentAmount}</p>
          <p><span class="bold">Profit Amount:</span> ₹${profitAmount}</p>
          <p><span class="bold">Date:</span> </p>
          
          <div class="footer">
            <p><span class="bold">Contact Details</span></p>
            <p>Email: gfcsmsd@gmail.com</p>
            <p>Phone: +91 7029121433</p>
            <p>Address: Vill-Mukundabag, P.O-Kiriteswari, P.S-Jiaganj, Pin-742104, Dist-Murshidabad</p>
          </div>
          <br/><br/>
          <div class="signature">
            <p><span class="bold">Authorized Signature:</span> ____________________</p>
          </div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(slipContent);
    newWindow.document.close();
    newWindow.focus(); // Ensures the new window is in focus
  };
  return (
    <div className="form-wrapper">
      <div className="profit-container">
        <form onSubmit={handleSubmit} className="profit-form">
          <h2 className="form-title">Profit Funds</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="account-number">Account Number</label>
            <input
              type="text"
              id="account-number"
              className="form-control"
              placeholder="Enter investment account number"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <button
              type="button"
              onClick={handleVerify}
              className="btn verify-btn"
            >
              Verify Account
            </button>
          </div>

          {isVerified && (
            <>
              <div className="verified-info">
                <p>Consumer Name: <strong>{accountName}</strong></p>
                <p>Invested Amount: <strong>₹ {investmentAmount}</strong></p>
              </div>

              <div className="form-group">
                <label htmlFor="profit-amount">Profit Amount (₹)</label>
                <input
                  type="number"
                  id="profit-amount"
                  className="form-control"
                  placeholder="Enter profit amount"
                  value={profit}
                  onChange={(e) => setProfit(e.target.value)}
                />
              </div>

              <button type="submit" className="btn submit-btn">Submit Profit</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profit;
