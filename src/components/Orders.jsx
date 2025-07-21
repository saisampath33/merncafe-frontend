import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Orders.css"; // External CSS for styling

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("❌ Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("❌ Something went wrong");
    }
  };

  return (
    <div className="orders-container">
      <h2>📦 Order Management</h2>
      <div className="order-filter">
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending ⏳</option>
          <option value="completed">Completed ✅</option>
          <option value="cancelled">Cancelled ❌</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <ul className="orders-list">
        {orders &&
          orders.map((order) => (
            <li key={order._id} className="order-item">
              <span> <b>{order._id}</b></span>
              <span> ₹{order.orderValue}</span>
              <span>Status: <strong>{order.status}</strong></span>
              {order.status === "Pending" && (
                <div className="order-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => updateOrder("cancelled", order._id)}
                  >
                     Cancel
                  </button>
                  <button
                    className="complete-btn"
                    onClick={() => updateOrder("completed", order._id)}
                  >
                     Complete
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>

      <div className="pagination-controls">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀️ Previous
        </button>
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ▶️
        </button>
      </div>
    </div>
  );
}
