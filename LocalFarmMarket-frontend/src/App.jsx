import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SellerLayout from "./components/seller/SellerLayout"; // Make sure this exists

// Buyer Pages
import Home from "./pages/buyer/Home";
import About from "./pages/buyer/About";
import Blog from "./pages/buyer/Blog";
import Cart from "./pages/buyer/Cart";
import Contact from "./pages/buyer/Contact";
import Events from "./pages/buyer/Events";
import ProductList from "./pages/buyer/ProductList";
import ProductDetails from "./pages/buyer/ProductDetails";
import Profile from "./pages/Profile";
import Search from "./pages/buyer/Search";
import Payment from "./pages/buyer/Payment";
import CheckoutPage from "./pages/buyer/CheckoutPage";
import OrderHistory from "./pages/buyer/OrderHistory";
import OrderDetail from "./pages/buyer/OrderDetail";

// Authentication Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

// Seller/Admin Pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import ManageProducts from "./pages/seller/ManageProducts";
import ManageOrders from "./pages/seller/ManageOrders";
import ManageUsers from "./pages/seller/ManageUsers";
import AddEditProduct from "./pages/seller/AddEditProduct";
import AddEditUser from "./pages/seller/AddEditUser";




// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles
import "./styles/global.css";
import "./styles/seller.css";

// Layout Component to conditionally hide Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarFooter = ["/register", "/login"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main>{children}</main>
      <ToastContainer position="top-center" autoClose={3000} />
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Routes>
            {/* Routes without layout */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Routes with layout */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    {/* Buyer Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/productlist" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/profile" element={
  <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
    <Profile />
  </ProtectedRoute>
} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/orders/:id" element={<OrderDetail />} />

                    {/* Seller/Admin Protected Routes */}
                    <Route
                      element={<ProtectedRoute allowedRoles={["seller", "admin"]} />}
                    >
                      <Route element={<SellerLayout />}>
                        <Route path="/seller-dashboard" element={<SellerDashboard />} />
                        <Route path="/seller/orders" element={<ManageOrders />} />
                        <Route path="/seller-users" element={<ManageUsers />} />
                        <Route path="/seller-users/edit/:id" element={<AddEditUser />} />
                        <Route path="/seller/products" element={<ManageProducts />} />
<Route path="/seller/products/add" element={<AddEditProduct />} />
<Route path="/seller/products/edit/:id" element={<AddEditProduct />} />
                      </Route>
                    </Route>
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
