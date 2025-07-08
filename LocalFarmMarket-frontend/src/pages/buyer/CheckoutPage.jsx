import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../services/orderService';
import '../../styles/checkout.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const {  token, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!token || !currentUser) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [token, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validate and transform product IDs
      const validatedProducts = cartItems.map(item => {
        const productId = item.id || item._id;
        const stringId = typeof productId === 'number' 
          ? productId.toString().padStart(24, '0') 
          : productId;
        
        return {
          product: stringId,
          quantity: item.quantity
        };
      });
    
      // Validate payment method
      const validPaymentMethods = ['cash', 'card', 'mobile'];
      if (!validPaymentMethods.includes(paymentMethod)) {
        throw new Error('Invalid payment method selected');
      }
    
      const orderData = {
        products: validatedProducts,
        total: totalCost,
        shippingAddress,
        paymentMethod,
      };
    
      console.log('Final Order Payload:', orderData); // Debug
    
      const orderResponse = await orderService.createOrder(orderData, token);
      clearCart();
      
        
  try {
    const paymentData = {
      orderId: orderResponse._id,
      paymentMethod: paymentMethod,
      amount: totalCost,
      status: 'completed',
    };
    await orderService.createPayment(paymentData, token);
  } catch (paymentError) {
    console.error('Payment creation failed but order was created:', paymentError);
    // You might want to handle this case differently
  }
      navigate('/orders');
    } catch (err) {
      console.error('Order Error:', err);
      setError(err.message || 'Failed to place order. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shipping Address</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="card">Credit Card</option>
            <option value="mobile">Mobile Payment</option>
          </select>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>ETB {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Total:</strong>
            <strong>ETB {totalCost.toFixed(2)}</strong>
          </div>
        </div>

        <button type="submit" disabled={isLoading || cartItems.length === 0}>
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;