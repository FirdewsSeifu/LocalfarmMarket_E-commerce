// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE || "http://localhost:5001",
  withCredentials: true,  // Ensure credentials (cookies, etc.) are included
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept request to add token to Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");  // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Add token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept response to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, please log in.");
    }
    return Promise.reject(error);
  }
);

export default api;
