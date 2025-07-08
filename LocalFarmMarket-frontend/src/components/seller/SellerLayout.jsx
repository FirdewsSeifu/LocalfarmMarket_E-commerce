// client/src/layouts/SellerLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../styles/SellerDashboard.css";

const SellerLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Seller Panel</h2>
        <nav className="sidebar-nav">
          <Link to="/seller-dashboard" className={isActive("/seller-dashboard")}>
            Dashboard Overview
          </Link>
          <Link to="/seller/products" className={isActive("/seller/products")}>
            Manage Products
          </Link>
          <Link to="/seller/orders" className={isActive("/seller/orders")}>
            Manage Orders
          </Link>
          <Link to="/seller-users" className={isActive("/seller-users")}>
            Manage Users
          </Link>
        </nav>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
