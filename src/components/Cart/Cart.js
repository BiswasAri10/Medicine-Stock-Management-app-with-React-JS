import React, { useContext } from 'react';
import { CartContext } from '../store/cart-context';
import classes from './Cart.module.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className={classes['cart-items']}>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity}
              <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
