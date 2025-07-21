import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Products.css";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...form,
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div className="products-container">
      <h2 className="products-title">🌟 Product Management
      </h2>
      {error && <div className="error-msg">{error}</div>}
      <form ref={frmRef} className="product-form">
        <input
          name="productName"
          value={form.productName}
          type="text"
          placeholder="🌊 Product Name"
          onChange={handleChange}
          required
        />
        <input
          name="description"
          value={form.description}
          type="text"
          placeholder="🔍 Description"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          value={form.price}
          type="number"
          placeholder="💲 Price"
          onChange={handleChange}
          required
        />
        <input
          name="imgUrl"
          value={form.imgUrl}
          type="text"
          placeholder="📸 Image URL"
          onChange={handleChange}
          required
        />
        {editId ? (
          <div className="form-buttons">
            <button className="edit-btn" onClick={handleUpdate}>
              <FaEdit /> Update
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              <FaTimes /> Cancel
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={handleAdd}>
            <FaPlus /> Add
          </button>
        )}
      </form>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button onClick={fetchProducts}>
          <FaSearch />
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🌟 Name</th>
              <th>🖊️ Description</th>
              <th>💲 Price</th>
              <th>📸 Image</th>
              <th>🔧 Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value) => (
              <tr key={value._id}>
                <td>{value.productName}</td>
                <td>{value.description}</td>
                <td>{value.price}</td>
                <td>
                  <img
                    src={value.imgUrl}
                    alt={value.productName}
                    className="product-img"
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(value)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(value._id)}
                    className="delete-btn"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅️ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ➡️
        </button>
      </div>
    </div>
  );
}
