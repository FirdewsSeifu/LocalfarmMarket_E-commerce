import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../styles/cart.css';


const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
<div className="cart-container">
  <h2 className="cart-title">Your Cart</h2>
  {cartItems.length === 0 ? (
    <p className="cart-empty">Your cart is empty.</p>
  ) : (
    <>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <h4>{item.name}</h4>
            <p>ETB {item.price} each</p>
          </div>
          <div className="cart-item-controls">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
              className="cart-input"
            />
            <button onClick={() => removeFromCart(item.id)} className="cart-remove">Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <h3 className="cart-total">Total: ETB {totalCost.toFixed(2)}</h3>
        <button
          onClick={() => navigate('/checkout')}
          className="cart-button"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  )}
</div>

  );
};

export default CartPage;
