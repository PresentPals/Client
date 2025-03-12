import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { AdminStatus } from '../authorise/AdminStatus';
// import "../styling/HamburgerMenu.css";
import "../pages/styles/styles.css";

// This function is the hamburger menu dropdown to be placed in most of the pages return areas at the top:
const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if the menu is open or not

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state to open/close the menu
  };

  const handleLogout = () => {
 
    localStorage.removeItem("token");

    console.log("Token removed:", !localStorage.getItem("token"));
  }

  const isAdmin = AdminStatus();

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu} // On click, toggle the menu
        aria-expanded={isMenuOpen ? 'true' : 'false'}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span><br></br> {/* This is the hamburger icon (1 line) */}
        <span className="navbar-toggler-icon"></span><br></br> {/* This is the hamburger icon (1 line) */}
        <span className="navbar-toggler-icon"></span> {/* This is the hamburger icon (1 line) */}
      </button>

      {/* Menu */}
      <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/api/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          { isAdmin && (
          <li className="nav-item">
            <Link className="nav-link" to="/api/giftlist/event" onClick={() => setIsMenuOpen(false)}>
            Create A List
            </Link>
          </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/api/giftlist/" onClick={() => setIsMenuOpen(false)}>
            Gift Lists
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/user/" onClick={() => setIsMenuOpen(false)}>
              Profiles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/auth/login" onClick={() => { handleLogout();}}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;