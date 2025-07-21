import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  const location = useLocation();

  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <h2 className="admin-title">🛠️ Admin Panel</h2>
        <ul>
          <li className={location.pathname === "/admin" ? "active" : ""}>
            <Link to="/admin">👤 Users</Link>
          </li>
          <li className={location.pathname.includes("products") ? "active" : ""}>
            <Link to="/admin/products">🛍️ Products</Link>
          </li>
          <li className={location.pathname.includes("orders") ? "active" : ""}>
            <Link to="/admin/orders">📦 Orders</Link>
          </li>
        </ul>
      </nav>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
