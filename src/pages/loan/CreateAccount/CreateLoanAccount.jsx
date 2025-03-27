
import { useState, useEffect } from 'react';
import './CreateLoanAccountForm.css';
import api from '../../../api';
import logo from "../../../assets/icons/logo.svg";

const CreateLoanAccount = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [AadharNo, setAadharNo] = useState('');
  const [Address, setAddress] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [timePeriod, setTimePeriod] = useState(''); // New state for time period
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const printLoanSlip = (accountNo, consumerName, loanAmount, date, AadharNo, mobileNo, Address, timePeriod) => {
    const slipContent = `
      <html>
      <head>
        <title>Loan Account Created</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .receipt-container { 
            border: 2px solid #000; padding: 20px; width: 400px; margin: auto; 
            border-radius: 10px; box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
            background-color: #f9f9f9;
          }
          h2, h3 { margin-bottom: 8px; }
          p { margin: 6px 0; font-size: 14px; }
          .bold { font-weight: bold; }
          .logo { max-width: 100px; margin-bottom: 10px; }
          .footer { 
            margin-top: 15px; padding-top: 10px; border-top: 1px solid #000; 
            font-size: 12px; text-align: left; 
          }
          .signature { margin-top: 20px; font-size: 14px; text-align: right; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <img src="${logo}" alt="Trust Logo" class="logo" />
          <h2>Golden Future Supportive Trust</h2>
          <h3>Your Loan Approved <h3/>
          <p><span class="bold">Consumer Account No:</span> ${accountNo}</p>
          <p><span class="bold">Consumer Name:</span> ${consumerName}</p>
          <p><span class="bold">Aadhar No:</span> ${AadharNo}</p>
          <p><span class="bold">Mobile No:</span> ${mobileNo}</p>
          <p><span class="bold">Address:</span> ${Address}</p>
          <p><span class="bold">Loan Amount:</span> ₹${loanAmount}</p>
          <p><span class="bold">Time Period:</span> ${timePeriod} months</p>
          <p><span class="bold">Date:</span> ${date}</p>
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
    const newWindow = window.open('', '_blank', 'width=600,height=600');
    newWindow.document.write(slipContent);
    newWindow.document.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const result = await api.post('/api/loan/create-account', { 
            date, 
            AadharNo, 
            loanAmount: Number(loanAmount),  // Convert to number
            name, 
            Address, 
            email, 
            mobileNo, 
            timePeriod: Number(timePeriod) // Convert to number
        });

        console.log(result);

        if (result.data.success) {
            alert("Account created successfully");

            const { accountNo } = result.data.data;

            printLoanSlip(accountNo, name, loanAmount, date, AadharNo, mobileNo, Address, timePeriod);

            setDate('');
            setName('');
            setMobileNo('');
            setAddress('');
            setAadharNo('');
            setEmail('');
            setLoanAmount('');
            setTimePeriod('');
        } else {
            setError(result.data.message);
            alert(result.data.message);
        }
    } catch (error) {
        console.error("API Error:", error);
        setError(error.response?.data?.message || 'An error occurred while creating the account.');
    }
};


  return (
    <div className='update-account-container'>
      <h2>Create Loan Account</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter Consumer Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Consumer Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Aadhar No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Aadhar Number"
            value={AadharNo}
            onChange={(e) => setAadharNo(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text"
            className="form-control"
            placeholder="Enter Consumer Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Loan Amount</label>
          <input type="text"
            className="form-control"
            placeholder="Enter Loan Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Time Period (Months)</label>
          <input type="number"
            className="form-control"
            placeholder="Enter Loan Duration"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateLoanAccount;
