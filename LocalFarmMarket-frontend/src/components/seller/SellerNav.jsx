// components/SellerNav.js
import React from 'react';
import { Link } from 'react-router-dom';

const SellerNav = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-6">
        <li><Link to="/seller/products" className="hover:text-yellow-400">Products</Link></li>
        <li><Link to="/seller/orders" className="hover:text-yellow-400">Orders</Link></li>
        <li><Link to="/seller/users" className="hover:text-yellow-400">Users</Link></li>
        <li><Link to="/seller/messages" className="hover:text-yellow-400">Messages</Link></li>
        <li><Link to="/seller/reviews" className="hover:text-yellow-400">Reviews</Link></li>
      </ul>
    </nav>
  );
};

export default SellerNav;
