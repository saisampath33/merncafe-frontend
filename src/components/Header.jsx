import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <header className="main-header">
      <div className="header-container">
        <h1 className="logo">Cup of Coffee</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">MyCart</Link>
          <Link to="/order">MyOrder</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          {user?.token ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
