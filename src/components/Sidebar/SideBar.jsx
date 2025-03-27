import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle, faCoins, faWallet, faListAlt, faSearch, faClipboardList,
  faMoneyBillWave, faChartLine, faHandHoldingUsd, faChartPie, faUniversity,
  faUsers, faWindowClose, faBars
} from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./SideBar.css";

const SideBar = () => {
  const [openSection, setOpenSection] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = (section) => setOpenSection(section);
  const handleMouseLeave = () => setOpenSection(null);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>

        {/* Savings Account Section */}
        <div className={`section ${openSection === "savings" ? "expanded" : ""}`}
          onMouseEnter={() => handleMouseEnter("savings")}
          onMouseLeave={handleMouseLeave}
        >
          <h2>
            <FontAwesomeIcon icon={faUniversity} />
            <span>Savings</span>
          </h2>
          {openSection === "savings" && (
            <div className="dropdown-content">
              <NavLink to="/app/savings/create"><FontAwesomeIcon icon={faPlusCircle} /> Create Account</NavLink>
              <NavLink to="/app/savings/deposit"><FontAwesomeIcon icon={faCoins} /> Deposit</NavLink>
              <NavLink to="/app/savings/withdraw"><FontAwesomeIcon icon={faWallet} /> Withdraw</NavLink>
              <NavLink to="/app/savings/all"><FontAwesomeIcon icon={faListAlt} /> All Accounts</NavLink>
              <NavLink to="/app/savings/search-account"><FontAwesomeIcon icon={faSearch} /> Search Account</NavLink>
              <NavLink to="/app/savings/audit"><FontAwesomeIcon icon={faClipboardList} /> Savings Transaction</NavLink>
              <NavLink to="/app/savings/money-transfer"><FontAwesomeIcon icon={faClipboardList} /> Money Transfer</NavLink>
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
              <NavLink to="/app/loan/create"><FontAwesomeIcon icon={faPlusCircle} /> Create Account</NavLink>
              <NavLink to="/app/loan/emi"><FontAwesomeIcon icon={faMoneyBillWave} /> EMI</NavLink>
              <NavLink to="/app/loan/all"><FontAwesomeIcon icon={faListAlt} /> Loan Accounts</NavLink>
              <NavLink to="/app/loan/search-loan-account"><FontAwesomeIcon icon={faSearch} /> Search Account</NavLink>
              <NavLink to="/app/loan/audit"><FontAwesomeIcon icon={faClipboardList} /> Loan Transaction</NavLink>
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
              <NavLink to="/app/investment/create"><FontAwesomeIcon icon={faPlusCircle} /> Create Account</NavLink>
              <NavLink to="/app/investment/profit"><FontAwesomeIcon icon={faChartLine} /> Profit Return</NavLink>
              <NavLink to="/app/investment/all"><FontAwesomeIcon icon={faListAlt} /> Investment Accounts</NavLink>
              <NavLink to="/app/investment/search-investment-account"><FontAwesomeIcon icon={faSearch} /> Search Account</NavLink>
              <NavLink to="/app/investment/audit"><FontAwesomeIcon icon={faClipboardList} /> Investment Transaction</NavLink>
              <NavLink to="/app/investment/close-investment"><FontAwesomeIcon icon={faWindowClose} /> Close Investment</NavLink>
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
              <NavLink to="/app/society/donation"><FontAwesomeIcon icon={faChartLine} /> Donation</NavLink>
              <NavLink to="/app/society/donor-list"><FontAwesomeIcon icon={faListAlt} /> Donor List</NavLink>
              <NavLink to="/app/society/expenditure"><FontAwesomeIcon icon={faPlusCircle} /> Expenditure</NavLink>
              <NavLink to="/app/society/expenditure-list"><FontAwesomeIcon icon={faListAlt} /> Expenditure List</NavLink>
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
