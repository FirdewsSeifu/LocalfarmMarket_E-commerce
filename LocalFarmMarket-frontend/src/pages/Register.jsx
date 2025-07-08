import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/register.css";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (form.password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/api/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      setSuccess(response.data.message || "Registration successful!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-card">
      <div className="image">
        <div className="logo">
          <a href="/" onClick={(e) => e.preventDefault()}>
            <h1>🌾 Geberew</h1>
          </a>
        </div>
      </div>

      <div className="signup-form">
        <h2>Sign-up</h2>
        <p>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>Join Us!</span>
          <br />
          Create your account and enjoy the best from our local farm.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? "Processing..." : "Sign-up"}
          </button>
        </form>

        <div className="login">
          <p>
            Already have an account?{" "}
            <a href="/login" className="linklogin">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
