
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../../api";
import Logo from '../../../assets/icons/logo.svg';
import "./SignIn.css";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("consumer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = (type) => {
    setLoginType(type);
    setUsername("");
    setPassword("");
    setAccountNo("");
    setError("");
  };

  const verifyAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/api/admin/login", { username, password });

      if (res.data.success) {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("username", username);
        toast.success("Login Successful!", { position: "top-center", autoClose: 2000 });
        navigate("/app/society/adminpanel");
      } else {
        toast.error("Invalid Username & Password", { position: "top-center", autoClose: 3000 });
        setError("Invalid Username & Password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server error. Please try again later.", { position: "top-center", autoClose: 3000 });
      setError("Server error. Please try again later.");
    }
    setIsLoading(false);
  };

  const verifyBranch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/api/branch/login", { username, password });

      if (res.data.success) {
        localStorage.setItem("userType", "branch");
        localStorage.setItem("username", username);
        toast.success("Login Successful!", { position: "top-center", autoClose: 2000 });
        navigate("/app/society/dashboard");
      } else {
        toast.error("Invalid Username & Password", { position: "top-center", autoClose: 3000 });
        setError("Invalid Username & Password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server error. Please try again later.", { position: "top-center", autoClose: 3000 });
      setError("Server error. Please try again later.");
    }
    setIsLoading(false);
  };

  const verifyConsumer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/api/savings/consumer-login", { accountNo, dob: password });
      

      if (res.data.success) {
        localStorage.setItem("userType", "consumer");
        localStorage.setItem("accountNo", accountNo);
        toast.success("Login Successful!", { position: "top-center", autoClose: 2000 });

        navigate(`/app/savings/account/${accountNo}`);
      } else {
        toast.error("Invalid Account Number or Date of Birth", { position: "top-center", autoClose: 3000 });
        setError("Invalid Account Number or Date of Birth");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server error. Please try again later.", { position: "top-center", autoClose: 3000 });
      setError("Server error. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="background-overlay"></div>

      <div className="switch-buttons">
        <button className={loginType === "consumer" ? "active" : ""} onClick={() => handleToggle("consumer")}>
          Consumer
        </button>
        <button className={loginType === "branch" ? "active" : ""} onClick={() => handleToggle("branch")}>
          Branch
        </button>
        <button className={loginType === "admin" ? "active" : ""} onClick={() => handleToggle("admin")}>
          Admin
        </button>
      </div>

      <div className={`card ${loginType}`}>
        <img className="logo" src={Logo} alt="Logo" />
        <h2>Welcome, {loginType.charAt(0).toUpperCase() + loginType.slice(1)}!</h2>
        <h3>Golden Future Supportive Trust</h3>
        <br />

        {loginType === "consumer" ? (
          <form className="form" onSubmit={verifyConsumer}>
            <input
              type="text"
              placeholder="Enter Account Number"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form className="form" onSubmit={loginType === "branch" ? verifyBranch : verifyAdmin}>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-text">{error}</p>}
            {isLoading ? <div className="loader"></div> : <button type="submit">Sign In</button>}
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;

