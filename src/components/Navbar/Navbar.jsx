import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUserShield, 
  faTachometerAlt, 
  faInfoCircle, 
  faEnvelope, 
  faSignOutAlt,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../assets/icons/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <div className="navbar-container">
      <div className="navbar-brand">
        <img src={logo} alt="GFST Logo" className="navbar-logo" />
        <div className="heading">Golden Future Supportive Trust</div>
      </div>
      
      <div className="menu-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </div>
      
      <div className={`navbar-links ${mobileMenuOpen ? 'show' : ''}`}>
        <NavLink 
          to="/app/society/adminpanel" 
          className="nav-link"
          onClick={closeMobileMenu}
        >
          <FontAwesomeIcon icon={faUserShield} /> 
          <span>Admin Panel</span>
        </NavLink>
        
        <NavLink 
          to="/app/society/dashboard" 
          className="nav-link"
          onClick={closeMobileMenu}
        >
          <FontAwesomeIcon icon={faTachometerAlt} /> 
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/app/society/about" 
          className="nav-link"
          onClick={closeMobileMenu}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> 
          <span>About</span>
        </NavLink>
        
        <NavLink 
          to="/app/society/contact" 
          className="nav-link"
          onClick={closeMobileMenu}
        >
          <FontAwesomeIcon icon={faEnvelope} /> 
          <span>Contact</span>
        </NavLink>
        
        <button 
          onClick={() => {
            handleLogout();
            closeMobileMenu();
          }} 
          className="nav-link logout-button"
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> 
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;