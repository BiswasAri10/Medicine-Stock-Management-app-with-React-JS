import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingMedicine = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingMedicine) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      return state
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (medicine) => {
    dispatch({ type: "ADD_TO_CART", payload: medicine });
  };

  const removeFromCart = (medicineId) => {
    const cartItem = cart.find((item) => item.id === medicineId);

    if (cartItem && cartItem.quantity > 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: medicineId });
      props.updateMedicineQuantity(medicineId, 1); 
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
