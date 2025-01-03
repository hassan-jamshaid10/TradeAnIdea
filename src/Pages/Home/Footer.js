import React from 'react';
import './Footer.css';
import { useLocation } from "react-router-dom";

const Footer = () => {
const location = useLocation(); 

  const HideFooterOn = ["/login","/signUp","/forgot"];

  if (HideFooterOn.includes(location.pathname)) {
    return null; 
  }

  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>TradeAnIdea</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h4>Our Services</h4>
        <ul>
          <li>Submit Your Idea</li>
          <li>Collaborate with Software Houses</li>
          <li>Explore SDG-aligned Projects</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: <a href="mailto:support@tradeanidea.com" className="email-link">support@tradeanidea.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
