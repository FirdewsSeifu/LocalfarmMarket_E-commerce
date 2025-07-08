import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../services/orderService';
import { Link } from 'react-router-dom';
import '../../styles/seller-orders.css';

const SellerOrders = () => {
  const { currentUser, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getSellerOrders(token);
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

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus }, token);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="seller-orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>#{order._id.substring(0, 8)}</td>
                <td>{order.buyer.name}</td>
                <td>
                  {order.products
                    .filter(item => item.product.seller === currentUser.id)
                    .map(item => (
                      <div key={item.product._id}>
                        {item.product.name} (x{item.quantity})
                      </div>
                    ))}
                </td>
                <td>
                  ETB{' '}
                  {order.products
                    .filter(item => item.product.seller === currentUser.id)
                    .reduce(
                      (sum, item) => sum + item.priceAtPurchase * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={e => handleStatusUpdate(order._id, e.target.value)}
                    disabled={order.status === 'delivered' || order.status === 'cancelled'}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/orders/${order._id}`} className="view-btn">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerOrders;