import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../services/orderService';
import { Link } from 'react-router-dom';
import '../../styles/order-history.css';

const OrderHistory = () => {
  const { currentUser, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Orders on Component Mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders(token);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser, token]);

  // Remove Order Handler
  const handleRemoveOrder = async (orderId) => {
    try {
      await orderService.removeOrder(orderId, token); // Assuming removeOrder method exists
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove order');
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-history">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span>Order #{order._id.substring(0, 8)}</span>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>

              <div className="order-items">
                {order.products.map((item) => (
                  <div key={item.product._id} className="order-item">
                    <div className="item-details">
                      <h4>
                        <Link to={`/products/${item.product._id}`}>{item.product.name}</Link>
                      </h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ETB {item.priceAtPurchase.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div>
                  <p>Total: ETB {order.total.toFixed(2)}</p>
                  <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Link to={`/orders/${order._id}`} className="view-details">
                  View Details
                </Link>
                <button
                  className="remove-order"
                  onClick={() => handleRemoveOrder(order._id)}
                >
                  Remove Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
