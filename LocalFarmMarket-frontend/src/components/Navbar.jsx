import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCartArrowDown, 
  faUser, 
  faSignInAlt, 
  faUserPlus,
  faSignOutAlt,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import SellerHeader from "./seller/SellerHeader";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="logo" to={currentUser?.role === 'seller' ? '/seller-dashboard' : '/'} onClick={closeMenu}>
          Geberew 🪴
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {currentUser?.role === 'buyer' && (
            <>
              <Link to="/" onClick={closeMenu}>Home</Link>
              <Link to="/about" onClick={closeMenu}>About</Link>
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
              <Link to="/ProductList" onClick={closeMenu}>Products</Link>
              <Link to="/events" onClick={closeMenu}>Events</Link>
              <Link to="/blog" onClick={closeMenu}>Blog</Link>
            </>
          )}
          {currentUser?.role === "seller" && (
            <SellerHeader closeMenu={closeMenu} />
          )}
          {!currentUser && (
            <>
              <Link to="/" onClick={closeMenu}>Home</Link>
              <Link to="/about" onClick={closeMenu}>About</Link>
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
              <Link to="/ProductList" onClick={closeMenu}>Products</Link>
              <Link to="/events" onClick={closeMenu}>Events</Link>
              <Link to="/blog" onClick={closeMenu}>Blog</Link>
            </>
          )}
          
          {/* Cart icon - shown for buyers or non-logged in users */}
          {(currentUser?.role === 'buyer' || !currentUser) && (
            <Link to="/cart" onClick={closeMenu}>
              <FontAwesomeIcon icon={faCartArrowDown} className="icon" />
            </Link>
          )}
        </div>

        <div className="auth-section">
          {currentUser ? (
            <div className="user-profile">
              {/* Changed to use a single profile route */}
              <Link to="/profile" onClick={closeMenu}>
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="profile-image"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="icon" />
                )}
              </Link>
              <button onClick={() => { logout(); closeMenu(); }} className="logout-btn">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" onClick={closeMenu}>
                <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Sign In
              </Link>
              <Link to="/register" onClick={closeMenu}>
                <FontAwesomeIcon icon={faUserPlus} className="icon" /> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;