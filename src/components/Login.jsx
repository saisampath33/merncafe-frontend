import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";
import "./Login.css";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={(e) => e.preventDefault()}>
        <h2 className="login-title">Login</h2>
        {error && <div className="error-msg">{error}</div>}
        <input
          type="text"
          placeholder="Email Address"
          className="login-input"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit" className="login-button" onClick={handleSubmit}>
          Sign In
        </button>
        <p className="login-link">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
