import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../services/orderService';
import '../../styles/order-detail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(id, token);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-detail">
      <h2>Order Details</h2>
      
      <div className="order-info">
        <div className="info-row">
          <span>Order ID:</span>
          <span>#{order._id.substring(0, 8)}</span>
        </div>
        <div className="info-row">
          <span>Status:</span>
          <span className={`status ${order.status}`}>{order.status}</span>
        </div>
        <div className="info-row">
          <span>Order Date:</span>
          <span>{new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <div className="info-row">
          <span>Payment Method:</span>
          <span>{order.paymentMethod}</span>
        </div>
        <div className="info-row">
          <span>Shipping Address:</span>
          <span>{order.shippingAddress}</span>
        </div>
      </div>

      {order.products.map(item => (
  <div key={item.product._id} className="order-item">



    <div className="item-details">
      <h4>{item.product.name}</h4>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ETB {item.priceAtPurchase.toFixed(2)} each</p>
      <p>Subtotal: ETB {(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
    </div>
  </div>
))}


      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>ETB {order.total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>ETB 0.00</span> {/* Adjust if you have shipping fees */}
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>ETB {order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;