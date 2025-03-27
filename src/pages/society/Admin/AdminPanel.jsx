import React, { useState, useEffect } from "react";
import api from "../../../api/index.js";
import "./AdminPanel.css";

const BranchManagement = () => {
  const [branchUsername, setBranchUsername] = useState("");
  const [branchPassword, setBranchPassword] = useState("");
  const [branchRegistry, setBranchRegistry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetUsername, setResetUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showBranchList, setShowBranchList] = useState(false);

  useEffect(() => {
    fetchBranchRegistry();
  }, []);

  const fetchBranchRegistry = async () => {
    setIsLoading(true);
    try {
      
      const response = await api.get("/api/branch/register");
      console.log("API Response:", response); // Debugging Log
      if (Array.isArray(response.data)) {
        setBranchRegistry(response.data);
      } else {
        console.error("Unexpected Data Structure:", response.data);
        setStatusMessage("Invalid data format received");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setStatusMessage("Failed to fetch branch registry");
    }
    setIsLoading(false);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setSuccessMessage("");

    if (branchUsername && branchPassword) {
      try {
        const response = await api.post("/api/branch/register", {
          username: branchUsername,
          password: branchPassword,
        });

        console.log("Branch Registered:", response.data); // Debugging Log
        setBranchRegistry([...branchRegistry, response.data]);
        setBranchUsername("");
        setBranchPassword("");
        setSuccessMessage("Branch registered successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        console.error("Registration Error:", err);
        setStatusMessage("Failed to create branch credentials");
      }
    }
  };

  const handleResetPassword = async () => {
    if (!resetUsername || !newPassword) {
      setStatusMessage("Username and new password required");
      return;
    }

    try {
      const response = await api.post("/api/branch/reset-branch-password", {
        username: resetUsername,
        newPassword,
      });

      console.log("Password Reset Response:", response); // Debugging Log

      if (response.status === 200) {
        setSuccessMessage("Password reset successfully");
        setStatusMessage("");
        setResetUsername("");
        setNewPassword("");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setStatusMessage(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Password Reset Error:", err);
      setStatusMessage(err.response?.data?.message || "Failed to reset password");
    }
  };

  const cancelPasswordReset = () => {
    setResetUsername("");
    setNewPassword("");
  };

  return (
    <div className="branch-management">
      <h2 className="branch-management__title">Branch Registration Portal</h2>

      {statusMessage && (
        <div className="branch-management__message branch-management__message--error">
          {statusMessage}
        </div>
      )}
      {successMessage && (
        <div className="branch-management__message branch-management__message--success">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleRegistrationSubmit} className="branch-management__form">
        <div className="branch-management__form-group">
          <label htmlFor="branch-username" className="branch-management__label">
            Branch Username
          </label>
          <input
            id="branch-username"
            type="text"
            value={branchUsername}
            onChange={(e) => setBranchUsername(e.target.value)}
            className="branch-management__input"
            required
          />
        </div>

        <div className="branch-management__form-group">
          <label htmlFor="branch-password" className="branch-management__label">
            Branch Password
          </label>
          <input
            id="branch-password"
            type="password"
            value={branchPassword}
            onChange={(e) => setBranchPassword(e.target.value)}
            className="branch-management__input"
            required
          />
        </div>

        <div className="branch-management__button-container">
          <button type="submit" className="branch-management__button branch-management__button--primary">
            Register Branch
          </button>
        </div>
      </form>

      <div className="branch-management__list-toggle">
        <button
          className="branch-management__button branch-management__button--secondary"
          onClick={() => setShowBranchList(!showBranchList)}
        >
          {showBranchList ? "Hide Branch List" : "Show Branch List"}
        </button>
      </div>

      {showBranchList && (
        <div className="branch-management__registry">
          {isLoading ? (
            <p className="branch-management__loading">Loading branch data...</p>
          ) : (
            branchRegistry.length > 0 && (
              <div className="branch-management__table-container">
                <h3 className="branch-management__subtitle">Registered Branches</h3>
                <div className="branch-management__table-wrapper">
                  <table className="branch-management__table">
                    <thead>
                      <tr>
                        <th className="branch-management__th">Branch Username</th>
                        <th className="branch-management__th">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branchRegistry.map((branch, index) => (
                        <tr key={index} className="branch-management__tr">
                          <td className="branch-management__td">{branch.username}</td>
                          <td className="branch-management__td">
                            <button
                              className="branch-management__button branch-management__button--small"
                              onClick={() => setResetUsername(branch.username)}
                            >
                              Reset Password
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
          {branchRegistry.length === 0 && !isLoading && (
            <p className="branch-management__empty">No branches registered yet.</p>
          )}
        </div>
      )}

      {resetUsername && (
        <div className="branch-management__reset-modal">
          <div className="branch-management__reset-content">
            <h3 className="branch-management__reset-title">Reset Password for {resetUsername}</h3>
            <div className="branch-management__form-group">
              <label htmlFor="new-password" className="branch-management__label">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="branch-management__input"
                required
              />
            </div>
            <div className="branch-management__button-group">
              <button
                className="branch-management__button branch-management__button--primary"
                onClick={handleResetPassword}
              >
                Update Password
              </button>
              <button
                className="branch-management__button branch-management__button--cancel"
                onClick={cancelPasswordReset}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchManagement;
