import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";
import orderService from "../services/orderService";
import profileService from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", role: "" });
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser, token, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        console.log(currentUser)
        setProfile({ 
          
          name: currentUser.name || currentUser.displayName || currentUser.email.split("@")[0] ||"Guest", 
          email: currentUser.email || "", 
          role: currentUser.role || "" 
        });

        // Fetch orders based on user role
        const userOrders = currentUser.role === "buyer" 
          ? await orderService.getMyOrders(token)
          : await orderService.getSellerOrders(token);
        
        setOrders(userOrders);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [currentUser, token, navigate]);

  const handleEditClick = async () => {
    if (editing) {
      setLoading(true);
      setError(null);
      try {
        const updatedUser = await profileService.updateProfile(
          { name: profile.name, email: profile.email },
          token
        );
        
        // Update the profile state with any changes from the server
        setProfile(prev => ({ ...prev, ...updatedUser }));
      } catch (err) {
        setError(err.message);
        console.error("Failed to update profile:", err);
      } finally {
        setLoading(false);
      }
    }
    setEditing(!editing);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="profile-container">
      <h2>My Account</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="profile-info">
        <p>
          <strong>Name:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          ) : (
            profile.name
          )}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {editing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          ) : (
            profile.email
          )}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
        <button onClick={handleEditClick} disabled={loading}>
          {editing ? (loading ? "Saving..." : "Save") : "Edit"}
        </button>
      </div>

      <h3>{profile.role === "buyer" ? "Order History" : "Sales History"}</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 8)}...</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button 
        onClick={() => { 
          logout(); 
          navigate("/login"); 
        }}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;