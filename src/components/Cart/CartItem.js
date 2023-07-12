import React from 'react';
import classes from './CartItem.module.css';

const CartItem = ({ item, onRemoveFromCart }) => {
  return (
    <li className={classes.cartItem}>
      <div>
        <span className={classes.itemName}>{item.name}</span>
        <span className={classes.itemQuantity}>Quantity: {item.quantity}</span>
      </div>
      <button className={classes.removeButton} onClick={onRemoveFromCart}>
        Remove
      </button>
    </li>
  );
};

export default CartItem;
