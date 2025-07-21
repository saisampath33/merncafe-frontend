import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import "./Order.css";
import { FaClipboardList, FaRupeeSign, FaBoxOpen, FaCheckCircle } from "react-icons/fa";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2><FaClipboardList /> My Orders</h2>
      {error && <p className="error-message">{error}</p>}
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h4>🧾 Order ID: <span>{order._id}</span></h4>
          <p><FaRupeeSign /> <strong>Total:</strong> ₹{order.orderValue}</p>
          <p><FaCheckCircle color="green" /> <strong>Status:</strong> {order.status}</p>

          <table className="order-table">
            <thead>
              <tr>
                <th><FaBoxOpen /> Product</th>
                <th>💰 Price</th>
                <th>📦 Qty</th>
                <th>🧮 Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>₹{item.price}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.qty * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
