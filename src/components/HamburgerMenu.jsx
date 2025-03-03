import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "../themes/HambugerMenu.css";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if the menu is open or not

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state to open/close the menu
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
  }

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
        <span className="navbar-toggler-icon"></span><br></br> {/* This is the hamburger icon (3 lines) */}
        <span className="navbar-toggler-icon"></span><br></br> {/* This is the hamburger icon (3 lines) */}
        <span className="navbar-toggler-icon"></span> {/* This is the hamburger icon (3 lines) */}
      </button>

      {/* Menu */}
      <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/api/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/giftlist/" onClick={() => setIsMenuOpen(false)}>
            Create A List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/giftlist" onClick={() => setIsMenuOpen(false)}>
            Gift Lists
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/user" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/api/login" onClick={() => {setIsMenuOpen(false); handleLogout();}}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;