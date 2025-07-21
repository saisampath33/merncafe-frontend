import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => sum + value.qty * value.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("❌ Something went wrong!");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 My Cart</h2>
      {error && <p className="cart-error">{error}</p>}

      <div className="cart-items">
        {cart &&
          cart.map(
            (item) =>
              item.qty > 0 && (
                <div key={item._id} className="cart-card">
                  <h3>📦 {item.productName}</h3>
                  <p>💰 Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decrement(item._id, item.qty)}>➖</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increment(item._id, item.qty)}>➕</button>
                  </div>
                  <p>🧾 Subtotal: ₹{item.price * item.qty}</p>
                </div>
              )
          )}
      </div>

      <div className="cart-summary">
        <h4>💵 Total Order Value: ₹{orderValue}</h4>
        {user?.token ? (
          <button className="place-order-btn" onClick={placeOrder}>
            🚀 Place Order
          </button>
        ) : (
          <button className="login-btn" onClick={() => Navigate("/login")}>
            🔒 Login to Order
          </button>
        )}
      </div>
    </div>
  );
}
