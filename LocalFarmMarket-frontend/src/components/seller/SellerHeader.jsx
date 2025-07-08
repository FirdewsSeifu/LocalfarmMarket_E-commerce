// components/SellerHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext'; // adjust path as needed

const SellerHeader = () => {
  const { logout } = useAuth();  // get logout function from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();           // clear user session
      navigate("/login");       // redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        
      </div>
    </header>
  );
};

export default SellerHeader;
