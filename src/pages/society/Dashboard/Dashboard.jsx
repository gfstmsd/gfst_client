
// import { useEffect, useState } from 'react';
// import api from '../../../api/index';
// import './Dashboard.css';
// import logo from '../../../assets/icons/logo.svg'

// function Dashboard() {
//   const [totalSavingsBalance, setTotalSavingsBalance] = useState(0);
//   const [totalLoanBalance, setTotalLoanBalance] = useState(0);
//   const [donationBalance, setTotalDonationBalance] = useState(0);
//   const [investmentBalance, setTotalInvestmentBalance] = useState(0);
//   const [expenditureBalance, setTotalExpenditure] = useState(0);
//   const [profitBalance, setTotalProfit] = useState(0);
//   const [totalEmi, setTotalEmi] = useState(0);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTotalBalances = async () => {
//       try {
//         const savingsResponse = await api.get('/api/society/total_savings_balance');
//         setTotalSavingsBalance(savingsResponse.data.totalBalance);

//         const loanResponse = await api.get('/api/society/total_loan_balance');
//         setTotalLoanBalance(loanResponse.data.totalLoanBalance);

//         const donationResponse = await api.get('/api/society/total_donation_balance');
//         setTotalDonationBalance(donationResponse.data.donationAmount);

//         const investmentResponse = await api.get('/api/society/total_investment');
//         setTotalInvestmentBalance(investmentResponse.data.investmentAmount);

//         const profitResponse = await api.get('/api/society/total_society_profit');
//         setTotalProfit(profitResponse.data.totalProfit);

//         const expenditureResponse = await api.get('/api/society/total_society_expenditure');
//         setTotalExpenditure(expenditureResponse.data.expenseAmount);

//         const emiResponse = await api.get('/api/society/total_society_emi');
//         setTotalEmi(emiResponse.data.totalEmi);

//       } catch (err) {
//         console.error('Error fetching balances:', err);
//         setError('Failed to fetch balances');
//       }
//     };

//     fetchTotalBalances();
//   }, []);

//   return (
//     <div className="dashboard-container">

//       <div className="dashboard-header-container">
//         <img src={logo} alt="GFST Logo" className="dashboard-logo" />
//         <h1 className="dashboard-header">Golden Future Supportive Trust</h1>
//       </div>
      
//       {error && <div className="error-message">{error}</div>}

//       <div className="cards-container">
//         <div className="card">
//           <div className="card-title">Society Total Amount</div>
//           <div className="card-content">₹{totalSavingsBalance + profitBalance + donationBalance}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Society Present Amount</div>
//           <div className="card-content">₹{(totalSavingsBalance + profitBalance + donationBalance) - expenditureBalance}</div>
//         </div>
//         <div className="card">
//           <div className="card-title"> Total Savings Amount</div>
//           <div className="card-content">₹{totalSavingsBalance}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Present Savings  Amount</div>
//           <div className="card-content">₹{totalSavingsBalance - ((totalLoanBalance - totalEmi) + investmentBalance)}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Total Loan  Amount</div>
//           <div className="card-content">₹{totalLoanBalance}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Collected Total EMI Amount</div>
//           <div className="card-content">₹{totalEmi}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Remaining Loan Amount</div>
//           <div className="card-content">₹{totalLoanBalance - totalEmi}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Investment  Amount</div>
//           <div className="card-content">₹{investmentBalance}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Profit from Investment</div>
//           <div className="card-content">₹{profitBalance}</div>
//         </div>
//         <div className="card">
//           <div className="card-title">Total Donation Amount</div>
//           <div className="card-content">₹{donationBalance}</div>
//         </div> 
//         <div className="card">
//           <div className="card-title">Total Expenditure</div>
//           <div className="card-content">₹{expenditureBalance}</div>
//         </div>             
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



//=================================================================================//


import { useEffect, useState } from 'react';
import api from '../../../api/index';
import './Dashboard.css';
import logo from '../../../assets/icons/logo.svg';

function Dashboard() {
  const [totalSavingsBalance, setTotalSavingsBalance] = useState(0);
  const [totalLoanBalance, setTotalLoanBalance] = useState(0);
  const [donationBalance, setTotalDonationBalance] = useState(0);
  const [investmentBalance, setTotalInvestmentBalance] = useState(0);
  const [expenditureBalance, setTotalExpenditure] = useState(0);
  const [profitBalance, setTotalProfit] = useState(0);
  const [totalEmi, setTotalEmi] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTotalBalances = async () => {
      try {
        const savingsResponse = await api.get('/api/society/total_savings_balance');
        setTotalSavingsBalance(Number(savingsResponse.data.totalBalance) || 0);

        const loanResponse = await api.get('/api/society/total_loan_balance');
        setTotalLoanBalance(Number(loanResponse.data.totalLoanAmount) || 0);
        const donationResponse = await api.get('/api/society/total_donation_balance');
        setTotalDonationBalance(Number(donationResponse.data.donationAmount) || 0);

        const investmentResponse = await api.get('/api/society/total_investment');
        setTotalInvestmentBalance(Number(investmentResponse.data.investmentAmount) || 0);

        const profitResponse = await api.get('/api/society/total_society_profit');
        setTotalProfit(Number(profitResponse.data.totalProfit) || 0);

        const expenditureResponse = await api.get('/api/society/total_society_expenditure');
        setTotalExpenditure(Number(expenditureResponse.data.expenseAmount) || 0);

        const emiResponse = await api.get('/api/society/total_society_emi');
        setTotalEmi(Number(emiResponse.data.totalEmi) || 0);

      } catch (err) {
        console.error('Error fetching balances:', err);
        setError('Failed to fetch balances');
      }
    };

    fetchTotalBalances();
  }, []);

  useEffect(() => {
    console.log("Total Savings Balance:", totalSavingsBalance);
    console.log("Total Loan Balance:", totalLoanBalance);
    console.log("Total Donation Balance:", donationBalance);
    console.log("Investment Balance:", investmentBalance);
    console.log("Total Profit Balance:", profitBalance);
    console.log("Total Expenditure:", expenditureBalance);
    console.log("Total EMI:", totalEmi);
  }, [totalSavingsBalance, totalLoanBalance, donationBalance, investmentBalance, profitBalance, expenditureBalance, totalEmi]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-container">
        <img src={logo} alt="GFST Logo" className="dashboard-logo" />
        <h1 className="dashboard-header">Golden Future Supportive Trust</h1>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      <div className="cards-container">
      <div className="card">
          <div className="card-title"></div>
          <div className="card-content">Welcome</div>
        </div>
        {/* <div className="card">
          <div className="card-title">Society Total Amount</div>
          <div className="card-content">₹{(totalSavingsBalance || 0) + (profitBalance || 0) + (donationBalance || 0)}</div>
        </div> */}
       
        <div className="card">
          <div className="card-title">Total Savings Amount</div>
          <div className="card-content">₹{totalSavingsBalance || 0}</div>
        </div>
        <div className="card">
          <div className="card-title">Present Savings Amount</div>
          <div className="card-content">₹{(totalSavingsBalance || 0) - ((totalLoanBalance || 0)  + (investmentBalance || 0))}</div>
        </div>
        {/* <div className="card">
          <div className="card-title">Total Loan Amount</div>
          <div className="card-content">₹{totalLoanBalance || 0}</div>
        </div> */}
        <div className="card">
          <div className="card-title">Remaining Loan Amount</div>
          <div className="card-content">₹{totalLoanBalance || 0}</div>
        </div>
        {/* <div className="card">
          <div className="card-title">Collected Loan Amount</div>
          <div className="card-content">₹{totalEmi || 0}</div>
        </div> */}
        {/* <div className="card">
          <div className="card-title">Remaining Loan Amount</div>
          <div className="card-content">₹{(totalLoanBalance || 0) - (totalEmi || 0)}</div>
        </div> */}
        <div className="card">
          <div className="card-title">Investment Amount</div>
          <div className="card-content">₹{investmentBalance || 0}</div>
        </div>
        <div className="card">
          <div className="card-title">Profit from Investment</div>
          <div className="card-content">₹{profitBalance || 0}</div>
        </div>
        <div className="card">
          <div className="card-title"> Donation Amount</div>
          <div className="card-content">₹{donationBalance || 0}</div>
        </div> 
        <div className="card">
          <div className="card-title"> Expenditure Amount</div>
          <div className="card-content">₹{expenditureBalance || 0}</div>
        </div>  
        <div className="card">
          <div className="card-title">Society Total Amount</div>
          <div className="card-content">₹{(profitBalance || 0) + (donationBalance || 0)}</div>
        </div>
        <div className="card">
          <div className="card-title">Society Present Amount</div>
          <div className="card-content">₹{((profitBalance || 0) + (donationBalance || 0)) - (expenditureBalance || 0)}</div>
        </div>
        <div className="card">
          <div className="card-title"></div>
          <div className="card-content">Thank you</div>
        </div> 
        <div className="card">
          <div className="card-title"></div>
          <div className="card-content">GFST</div>
        </div> 
                   
      </div>
    </div>
  );
}

export default Dashboard;
