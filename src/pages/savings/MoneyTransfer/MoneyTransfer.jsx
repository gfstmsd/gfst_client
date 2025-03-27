import React, { useState } from "react";
import api from '../../../api/index';
import "./MoneyTransfer.css";
import logo from '../../../assets/icons/logo.svg'; // Import logo for the slip

const MoneyTransfer = () => {
  const [senderAccount, setSenderAccount] = useState("");
  const [senderVerified, setSenderVerified] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderBalance, setSenderBalance] = useState("");

  const [receiverAccount, setReceiverAccount] = useState("");
  const [receiverVerified, setReceiverVerified] = useState(false);
  const [receiverName, setReceiverName] = useState("");

  const [transferAmount, setTransferAmount] = useState("");
  const [error, setError] = useState(null);

  const handleSenderVerify = async () => {
    try {
      const response = await api.get(`/api/savings/${senderAccount}`);
      if (response.data.success) {
        setSenderVerified(true);
        setSenderName(response.data.data.name);
        setSenderBalance(response.data.data.balance);
        setError(null);
      } else {
        setSenderVerified(false);
        setError("Sender account does not exist.");
      }
    } catch (err) {
      setSenderVerified(false);
      setError("Error verifying sender account.");
    }
  };

  const handleReceiverVerify = async () => {
    try {
      const response = await api.get(`/api/savings/${receiverAccount}`);
      if (response.data.success) {
        setReceiverVerified(true);
        setReceiverName(response.data.data.name);
        setError(null);
      } else {
        setReceiverVerified(false);
        setError("Receiver account does not exist.");
      }
    } catch (err) {
      setReceiverVerified(false);
      setError("Error verifying receiver account.");
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (parseFloat(transferAmount) > parseFloat(senderBalance)) {
      setError("Insufficient balance.");
      return;
    }

    try {
      const response = await api.post("/api/transaction/money-transfer", {
        fromAccount: senderAccount,
        toAccount: receiverAccount,
        amount: transferAmount,
      });

      if (response.data.success) {
        const newSenderBalance = parseFloat(senderBalance) - parseFloat(transferAmount);

        alert("Money transferred successfully!");

        // Generate the print slip
        printSlip(senderName, senderAccount, receiverName, receiverAccount, transferAmount, newSenderBalance);

        setSenderAccount("");
        setReceiverAccount("");
        setTransferAmount("");
        setSenderVerified(false);
        setReceiverVerified(false);
        setSenderName("");
        setSenderBalance("");
        setReceiverName("");
        setError(null);
      } else {
        setError(response.data.message || "Transaction failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error processing transfer.");
    }
  };

  // Function to generate the print slip
  const printSlip = (senderName, senderAcc, receiverName, receiverAcc, amount, newBalance) => {
    const slipContent = `
      <html>
      <head>
        <title>Money Transfer Slip</title>
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
          <h3>Money Transfer Slip</h3>  
          <p><span class="bold">Sender Account No:</span> ${senderAcc}</p>
          <p><span class="bold">Sender Name:</span> ${senderName}</p>
          <p><span class="bold">Receiver Account No:</span> ${receiverAcc}</p>
          <p><span class="bold">Receiver Name:</span> ${receiverName}</p>
          <p><span class="bold">Transfer Amount:</span> ₹${amount}</p>
          <p><span class="bold">Remaining Balance:</span> ₹${newBalance}</p>
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

    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(slipContent);
    newWindow.document.close();
  };

  return (
    <div className="form-wrapper">
      <div className="transfer-container">
        <form onSubmit={handleTransfer} className="transfer-form">
          <h2 className="form-title">Money Transfer</h2>
          {error && <p className="error-message">{error}</p>}

          {/* Sender Account Verification */}
          <div className="form-group">
            <label>Sender Account Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter sender account number"
              value={senderAccount}
              onChange={(e) => setSenderAccount(e.target.value)}
            />
            <button type="button" onClick={handleSenderVerify} className="btn verify-btn">
              Verify Sender
            </button>
          </div>

          {senderVerified && (
            <div className="verified-info">
              <p>Sender Name: <strong>{senderName}</strong></p>
              <p>Available Balance: <strong>₹ {senderBalance}</strong></p>
            </div>
          )}

          {/* Receiver Account Verification */}
          {senderVerified && (
            <>
              <div className="form-group">
                <label>Receiver Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter receiver account number"
                  value={receiverAccount}
                  onChange={(e) => setReceiverAccount(e.target.value)}
                />
                <button type="button" onClick={handleReceiverVerify} className="btn verify-btn">
                  Verify Receiver
                </button>
              </div>

              {receiverVerified && (
                <div className="verified-info">
                  <p>Receiver Name: <strong>{receiverName}</strong></p>
                </div>
              )}
            </>
          )}

          {/* Transfer Amount Input */}
          {senderVerified && receiverVerified && (
            <div className="form-group">
              <label>Transfer Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter transfer amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <button type="submit" className="btn submit-btn">
                Transfer Money
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MoneyTransfer;
