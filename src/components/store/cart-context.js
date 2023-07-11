import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (medicine) => {
    const existingMedicine = cart.find((item) => item.id === medicine.id);

    if (existingMedicine) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === medicineId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      return updatedCart.filter((item) => item.quantity > 0);
    });

    // Call the prop function to update medicine list quantity
    props.updateMedicineQuantity(medicineId);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
