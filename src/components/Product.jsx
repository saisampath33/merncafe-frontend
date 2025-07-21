import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <div className="product-container">
      {products &&
        products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.imgUrl} alt={product.productName} className="product-image" />
            <h3 className="product-title">{product.productName}</h3>
            <p className="product-description">{product.description}</p>
            <h4 className="product-price">₹{product.price}</h4>
            <button className="product-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}
