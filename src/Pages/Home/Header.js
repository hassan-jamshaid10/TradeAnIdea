import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("authToken"); // Mock login check
  const HideHeaderOn = ["/login", "/signUp", "/forgot"];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Mock logout
    navigate("/");
  };

  if (HideHeaderOn.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <header className="header-container">
        <div className="header-left">
          <img src="/assets/images/logo.png" alt="Logo" className="header-logo" />
          <h1 className="app-name">TRADE AN IDEA</h1>
        </div>
        <div className="header-right">
          <FaBars className="menu-icon" onClick={toggleSidebar} />
        </div>
      </header>
      {sidebarOpen && (
        <aside className="sidebar">
          <AiOutlineClose className="close-icon" onClick={toggleSidebar} />
          <ul className="sidebar-menu">
            <li>
              <Link to="/" onClick={toggleSidebar}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleSidebar}>About</Link>
            </li>
            <li>
              <Link to="/services" onClick={toggleSidebar}>Services</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/profile" onClick={toggleSidebar}>User Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </li>
              </>
            )}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Header;
