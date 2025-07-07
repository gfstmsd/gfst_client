import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle, faCoins, faWallet, faListAlt, faSearch, faClipboardList,
  faMoneyBillWave, faChartLine, faHandHoldingUsd, faChartPie, faUniversity,
  faUsers, faWindowClose, faBars, faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./SideBar.css";

const SideBar = () => {
  const [openSection, setOpenSection] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = (section) => setOpenSection(section);
  const handleMouseLeave = () => setOpenSection(null);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Close sidebar on link click (mobile only)
  const handleNavClick = () => {
    if (window.innerWidth <= 768) closeMenu();
  };

  return (
    <>
      {/* Hamburger toggle for mobile */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>

      {/* Sidebar container with responsive 'active' class */}
      <div className={`sidebar${menuOpen ? ' active' : ''}`}> 
        {/* Savings Section */}
        <div className={`section ${openSection === "savings" ? "expanded" : ""}`}
          onMouseEnter={() => handleMouseEnter("savings")}
          onMouseLeave={handleMouseLeave}
        >
          <h2>
            <FontAwesomeIcon icon={faCoins} />
            <span>Savings</span>
          </h2>
          {openSection === "savings" && (
            <div className="dropdown-content">
              <NavLink to="/app/savings/create" onClick={handleNavClick}><FontAwesomeIcon icon={faPlusCircle} /> Create Account</NavLink>
              <NavLink to="/app/savings/deposit" onClick={handleNavClick}><FontAwesomeIcon icon={faWallet} /> Deposit</NavLink>
              <NavLink to="/app/savings/withdraw" onClick={handleNavClick}><FontAwesomeIcon icon={faWallet} /> Withdraw</NavLink>
              <NavLink to="/app/savings/all" onClick={handleNavClick}><FontAwesomeIcon icon={faListAlt} /> All Accounts</NavLink>
              <NavLink to="/app/savings/search-account" onClick={handleNavClick}><FontAwesomeIcon icon={faSearch} /> Search Account</NavLink>
              <NavLink to="/app/savings/audit" onClick={handleNavClick}><FontAwesomeIcon icon={faClipboardList} /> Transactions</NavLink>
              <NavLink to="/app/savings/transfer" onClick={handleNavClick}><FontAwesomeIcon icon={faMoneyBillWave} /> Money Transfer</NavLink>
            </div>
          )}
        </div>

        {/* Loan Account Section */}
        <div className={`section ${openSection === "loan" ? "expanded" : ""}`}
          onMouseEnter={() => handleMouseEnter("loan")}
          onMouseLeave={handleMouseLeave}
        >
          <h2>
            <FontAwesomeIcon icon={faHandHoldingUsd} />
            <span>Loan</span>
          </h2>
          {openSection === "loan" && (
            <div className="dropdown-content">
              <NavLink to="/app/loan/create" onClick={handleNavClick}><FontAwesomeIcon icon={faPlusCircle} /> Create Account</NavLink>
              <NavLink to="/app/loan/emi" onClick={handleNavClick}><FontAwesomeIcon icon={faMoneyBillWave} /> EMI</NavLink>
              <NavLink to="/app/loan/all" onClick={handleNavClick}><FontAwesomeIcon icon={faListAlt} /> Loan Accounts</NavLink>
              <NavLink to="/app/loan/search-loan-account" onClick={handleNavClick}><FontAwesomeIcon icon={faSearch} /> Search Account</NavLink>
              <NavLink to="/app/loan/audit" onClick={handleNavClick}><FontAwesomeIcon icon={faClipboardList} /> Loan Transaction</NavLink>
            </div>
          )}
        </div>

        {/* Investment Section */}
        <div className={`section ${openSection === "investment" ? "expanded" : ""}`}
          onMouseEnter={() => handleMouseEnter("investment")}
          onMouseLeave={handleMouseLeave}
        >
          <h2>
            <FontAwesomeIcon icon={faChartPie} />
            <span>Investment</span>
          </h2>
          {openSection === "investment" && (
            <div className="dropdown-content">
              <NavLink to="/app/investment/create" onClick={handleNavClick}><FontAwesomeIcon icon={faPlusCircle} /> Create Account</NavLink>
              <NavLink to="/app/investment/profit" onClick={handleNavClick}><FontAwesomeIcon icon={faChartLine} /> Profit Return</NavLink>
              <NavLink to="/app/investment/all" onClick={handleNavClick}><FontAwesomeIcon icon={faListAlt} /> Investment Accounts</NavLink>
              <NavLink to="/app/investment/search-investment-account" onClick={handleNavClick}><FontAwesomeIcon icon={faSearch} /> Search Account</NavLink>
              <NavLink to="/app/investment/audit" onClick={handleNavClick}><FontAwesomeIcon icon={faClipboardList} /> Investment Transaction</NavLink>
              <NavLink to="/app/investment/close-investment" onClick={handleNavClick}><FontAwesomeIcon icon={faWindowClose} /> Close Investment</NavLink>
            </div>
          )}
        </div>

        {/* Society Section */}
        <div className={`section ${openSection === "society" ? "expanded" : ""}`}
          onMouseEnter={() => handleMouseEnter("society")}
          onMouseLeave={handleMouseLeave}
        >
          <h2>
            <FontAwesomeIcon icon={faUsers} />
            <span>Society</span>
          </h2>
          {openSection === "society" && (
            <div className="dropdown-content">
              <NavLink to="/app/society/donation" onClick={handleNavClick}><FontAwesomeIcon icon={faChartLine} /> Donation</NavLink>
              <NavLink to="/app/society/donor-list" onClick={handleNavClick}><FontAwesomeIcon icon={faListAlt} /> Donor List</NavLink>
              <NavLink to="/app/society/expenditure" onClick={handleNavClick}><FontAwesomeIcon icon={faPlusCircle} /> Expenditure</NavLink>
              <NavLink to="/app/society/expenditure-list" onClick={handleNavClick}><FontAwesomeIcon icon={faListAlt} /> Expenditure List</NavLink>
            </div>
          )}
        </div>

        <div className="contact-section">
          <p>© 2025 Golden Future Supportive Trust. All Rights Reserved.</p>
          <p>
            Developed by:{"  "}
            <a
              href="https://jakirulsk.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
            >
              Jakirul Sk
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
