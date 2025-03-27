// import { useState, useEffect } from 'react';
// import './CreateSavingAccountForm.css'; // Ensure this is your CSS file
// import api from '../../../api/index';

// const CreateSavingAccount = () => {
//   const [date, setDate] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobileNo, setMobileNo] = useState('');
//   const [AadharNo, setAadharNo] = useState('');
//   const [Address, setAddress] = useState('');
//   const [error, setError] = useState(null);

//   // Set the default date when the component mounts
//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
//     setDate(formattedDate);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!date || !name || !email || !mobileNo || !AadharNo || !Address) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     const mobileRegex = /^\d{10}$/;
//     if (!mobileRegex.test(mobileNo)) {
//       setError('Mobile number must be exactly 10 digits.');
//       return;
//     }

//     const aadharRegex = /^\d{12}$/;
//     if (!aadharRegex.test(AadharNo)) {
//       setError('Aadhar number must be exactly 12 digits.');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     api.post('/api/savings/create-account', { date, name, email, mobileNo, AadharNo, Address })
//       .then(result => {
//         console.log(result);

//         if (result.data.success) {
//           alert("Account created successfully");
//         } else {
//           alert(result.data.data.message);
//         }

//         setDate('');
//         setName('');
//         setMobileNo('');
//         setAadharNo('');
//         setAddress('');
//         setEmail('');
//         setError(null);
//       })
//       .catch(error => {
//         console.error(error);
//         setError('An error occurred while creating the account.');
//       });
// };


//   return (
//     <div className='update-account-container'>
//       <h2>Create Savings Account</h2>
//       <form onSubmit={handleSubmit} className="form-container">
//         {error && <p className="error">{error}</p>}
//         <div className="form-group">
//           <label>Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter Consumer Email ID"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Mobile No</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Mobile Number"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Aadhar No</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Aadhar Number"
//             value={AadharNo}
//             onChange={(e) => setAadharNo(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Address</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Address"
//             value={Address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CreateSavingAccount;










// import { useState, useEffect } from 'react';
// import './CreateSavingAccountForm.css'; // Ensure this is your CSS file
// import api from '../../../api/index';

// const CreateSavingAccount = () => {
//   const [date, setDate] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobileNo, setMobileNo] = useState('');
//   const [AadharNo, setAadharNo] = useState('');
//   const [Address, setAddress] = useState('');
//   const [dob, setDob] = useState(''); // Added DOB state
//   const [error, setError] = useState(null);

//   // Set the default date when the component mounts
//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
//     setDate(formattedDate);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!date || !name || !email || !mobileNo || !AadharNo || !Address || !dob) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     const mobileRegex = /^\d{10}$/;
//     if (!mobileRegex.test(mobileNo)) {
//       setError('Mobile number must be exactly 10 digits.');
//       return;
//     }

//     const aadharRegex = /^\d{12}$/;
//     if (!aadharRegex.test(AadharNo)) {
//       setError('Aadhar number must be exactly 12 digits.');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     api.post('/api/savings/create-account', { date, name, email, mobileNo, AadharNo, Address, dob })
//       .then(result => {
//         console.log(result);

//         if (result.data.success) {
//           alert("Account created successfully");
//         } else {
//           alert(result.data.data.message);
//         }

//         setDate('');
//         setName('');
//         setMobileNo('');
//         setAadharNo('');
//         setAddress('');
//         setEmail('');
//         setDob('');
//         setError(null);
//       })
//       .catch(error => {
//         console.error(error);
//         setError('An error occurred while creating the account.');
//       });
//   };

//   return (
//     <div className='update-account-container'>
//       <h2>Create Savings Account</h2>
//       <form onSubmit={handleSubmit} className="form-container">
//         {error && <p className="error">{error}</p>}
//         <div className="form-group">
//           <label>Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter Consumer Email ID"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Mobile No</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Mobile Number"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Aadhar No</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Aadhar Number"
//             value={AadharNo}
//             onChange={(e) => setAadharNo(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Address</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Consumer Address"
//             value={Address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Date of Birth</label>
//           <input
//             type="date"
//             className="form-control"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CreateSavingAccount;









import { useState, useEffect } from 'react';
import './CreateSavingAccountForm.css'; // Ensure this is your CSS file
import api from '../../../api/index';
import logo from "../../../assets/icons/logo.svg";

const CreateSavingAccount = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [AadharNo, setAadharNo] = useState('');
  const [Address, setAddress] = useState('');
  const [dob, setDob] = useState(''); // Added DOB state
  const [error, setError] = useState(null);

  // Set the default date when the component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
    setDate(formattedDate);
  }, []);

  // Print Saving Account Slip
  const printSavingSlip = (consumerName, AadharNo, mobileNo, Address, dob, date, email) => {
    const slipContent = `
      <html>
      <head>
        <title>Saving Account Slip</title>
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
          <h3>Saving Account Created</h3>
          
          <p><span class="bold">Consumer Account No:</span> </p>
          <p><span class="bold">Consumer Name:</span> ${consumerName}</p>
          <p><span class="bold">Aadhar No:</span> ${AadharNo}</p>
          <p><span class="bold">Email:</span> ${email}</p>
          <p><span class="bold">Mobile No:</span> ${mobileNo}</p>
          <p><span class="bold">Address:</span> ${Address}</p>
          <p><span class="bold">Date of Birth:</span> ${dob}</p>
          <p><span class="bold">Account created:</span> ${date}</p>       
          <div class="footer">
            <p><span class="bold">Contact Details</span> </p>
            <p>Email: gfcsmsd@gmail.com</p>
            <p>Phone: +91 7029121433</p>
            <p>Address: Vill-Mukundabag, P.O-Kiriteswari, P.S-Jiaganj, Pin-742104, Dist-Murshidabad</p>
          </div>
          <br/>
          <br/>
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

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !name || !email || !mobileNo || !AadharNo || !Address || !dob) {
      setError('Please fill in all fields.');
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(AadharNo)) {
      setError('Aadhar number must be exactly 12 digits.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    api.post('/api/savings/create-account', { date, name, email, mobileNo, AadharNo, Address, dob })
      .then(result => {
        console.log(result);

        if (result.data.success) {
          alert("Account created successfully");

          // ✅ Call print function after successful account creation
          printSavingSlip(name, AadharNo, mobileNo, Address, dob, date, email);

        } else {
          alert(result.data.data.message);
        }

        setDate('');
        setName('');
        setMobileNo('');
        setAadharNo('');
        setAddress('');
        setEmail('');
        setDob('');
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('An error occurred while creating the account.');
      });
  };

  return (
    <div className='update-account-container'>
      <h2>Create Savings Account</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            onChange={(e) => setAadharNo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Consumer Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateSavingAccount;
