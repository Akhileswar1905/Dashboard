import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async () => {
    const response = await fetch(
      "https://dashboard-backend-1fmq.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      localStorage.setItem("id", data._id);
      navigate("/", { state: data });
    }
  };

  return (
    <div className="container">
      <div className={styles.formBox}>
        <h1>Login</h1>
        <div className={styles.formLabel}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.formLabel}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          className="btn"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
        <p
          style={{
            alignSelf: "center",
          }}
        >
          Don't have an account <Link to="/register">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
