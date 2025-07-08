import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../api";
import "../styles/login.css";

const Login = () => {
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/api/auth/login", { email, password });

      const { token, user } = response.data;

      // ✅ Correctly pass both user and token to AuthContext
      login(user, token);

      // ✅ Redirect based on role
      if (user.role === "seller" || user.role === "admin") {
        navigate("/seller-dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="login-card">
      <div className="image">
        <div className="logo"><a href="/"><h1>🌾 Geberew</h1></a></div>
      </div>

      <div className="login-form">
        <h2>Login</h2>
        <p><strong>Welcome Back!</strong><br />Experience the best from our local farm.</p>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <a href="#" className="forgot">Forgot password?</a>
          <button type="submit" className="login-btn" disabled={isSubmitting || authLoading}>
            {isSubmitting ? "Authenticating..." : <><FontAwesomeIcon icon={faSignInAlt} /> Login</>}
          </button>
        </form>

        <div className="signup">
          <p>Don't have an account? <Link to="/register" className="linksignup">Signup</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
