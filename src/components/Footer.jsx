import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from React Router
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MERN Store</h3>
          <p>Your one-stop shop for quality products at affordable prices.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/order">My Orders</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: sampathmay10@gmail.com</p>
          <p>Phone: +91-8247757805</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MERN Store. All rights reserved.
      </div>
    </footer>
  );
}
