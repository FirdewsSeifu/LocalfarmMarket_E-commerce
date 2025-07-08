//src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE || "http://localhost:5001",
  withCredentials: true,
});

export default api;
