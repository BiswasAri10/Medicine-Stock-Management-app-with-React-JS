import React from 'react';
import Button from '../UI/Button';
import classes from './CartItem.module.css';

const CartItem = ({ item, onRemoveFromCart }) => {
  return (
    <li className={classes.cartItem}>
      <div>
        <span className={classes.itemName}>{item.name}</span>
        <span className={classes.itemQuantity}>Quantity: {item.quantity}</span>
      </div>
      <Button onClick={onRemoveFromCart}>
        Remove
      </Button>
    </li>
  );
};

export default CartItem;
