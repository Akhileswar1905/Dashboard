import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
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
        <h1>Sign Up</h1>
        <div className={styles.formLabel}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
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
        <div className={styles.formLabel}>
          <label htmlFor="confpwd">Confirm Password</label>
          <input
            type="password"
            name="confpwd"
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
          Do you have an account <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
