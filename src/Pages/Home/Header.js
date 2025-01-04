import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Features/authSlice"; // Import logout action from auth slice

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const HideHeaderOn = ["/login", "/signUp", "/forgot"]; // Pages to hide header

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear auth state
    navigate("/login"); // Redirect to login page
  };

  if (HideHeaderOn.includes(location.pathname)) {
    return null; // Hide header on specific routes
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
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" onClick={toggleSidebar}>User Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={toggleSidebar}>Login</Link>
                </li>
                <li>
                  <Link to="/signUp" onClick={toggleSidebar}>Sign Up</Link>
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
