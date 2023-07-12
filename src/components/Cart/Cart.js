import React, { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.cartContainer}>
      <div className={classes.cartIcon} onClick={openModal}>
        <FaShoppingCart />
        {cartItemsCount > 0 && <span className={classes.badge}>{cartItemsCount}</span>}
      </div>
      {isModalOpen && (
        <Modal title="Cart Items" onCloseModal={closeModal}>
          <ul className={classes.cartItemsList}>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemoveFromCart={() => handleRemoveFromCart(item.id)}
              />
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Cart;
