import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import assets1 from "../../assets1/asets1";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalCartQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.mainImage} alt={item.title} />
              <div>
                <h2>{item.title}</h2>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, false)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, true)}>+</button>
                </div>
              </div>
              <img src={assets1.crossIcon} className="crossIcon" onClick={() => removeFromCart(item.id)} />
            </div>
          ))}
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <Link to='/order'><button className="place-order-button">Place Order</button></Link>
        </>
      )}
    </div>
  );
};

export default Cart;
