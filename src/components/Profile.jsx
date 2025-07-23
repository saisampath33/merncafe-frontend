import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchProfile = async (showWelcome = true) => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      if (showWelcome) {
        toast.success(`Welcome ${result.data.firstName}!!`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile(); // welcome toast on initial load
  }, []);

  const logout = () => {
    setUser({});
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile(false); // don't show welcome toast after update
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="profile-container">
      <h3 className="profile-title">My Profile</h3>
      <button className="logout-btn" onClick={logout}>🚪 Logout</button>
      <div className="profile-fields">
        <input
          name="firstName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.firstName}
          placeholder="First Name"
        />
        <input
          name="lastName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.lastName}
          placeholder="Last Name"
        />
        <input
          name="email"
          type="text"
          onChange={handleChange}
          defaultValue={profile.email}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          defaultValue={profile.password}
          placeholder="Password"
        />
      </div>
      <button type="button" className="update-btn" onClick={handleSubmit}>
        Update Profile
      </button>
    </div>
  );
}
