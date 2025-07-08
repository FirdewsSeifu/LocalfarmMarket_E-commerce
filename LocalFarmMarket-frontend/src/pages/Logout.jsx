import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("loggedInUser"); // Clear the stored user
    navigate("/login", { replace: true }); // Redirect to login page
  }, [navigate]);

  return (
    <div className="logout-container">
      <h1>You have logged out</h1>
      <p>See you again soon!</p>
    </div>
  );
};

export default Logout;
