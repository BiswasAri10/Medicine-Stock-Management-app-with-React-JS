import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

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
    case "SET_CART_ITEMS":
      return action.payload.map((cartItem) => ({
        ...cartItem,
        serverGeneratedId: cartItem._id,
      }));
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (medicine) => {
    const existingMedicine = cart.find(
      (item) => item.serverGeneratedId === medicine._id
    );

    if (existingMedicine) {
      dispatch({ type: "ADD_TO_CART", payload: medicine });
    } else {
      const itemToAdd = {
        serverGeneratedId: medicine._id,
        name: medicine.name,
        description: medicine.description,
        price: medicine.price,
        quantity: 1,
      };

      axios
        .post(
          "https://crudcrud.com/api/d7b342f0641e412f861842737268b245/CartStock",
          itemToAdd
        )
        .then((response) => {
          dispatch({
            type: "ADD_TO_CART",
            payload: { ...itemToAdd, serverGeneratedId: response.data._id },
          });
        })
        .catch((error) => {
          console.error("Error adding medicine to cart:", error);
        });
    }
  };

  const removeFromCart = (medicineId) => {
    const cartItem = cart.find((item) => item.serverGeneratedId === medicineId);

    if (cartItem && cartItem.quantity > 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: cartItem.id });

      const updatedQuantity = cartItem.quantity - 1;

      axios
        .put(
          `https://crudcrud.com/api/d7b342f0641e412f861842737268b245/CartStock/${medicineId}`,
          { quantity: updatedQuantity }
        )
        .catch((error) => {
          console.error("Error updating medicine quantity:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://crudcrud.com/api/d7b342f0641e412f861842737268b245/CartStock"
      )
      .then((response) => {
        dispatch({ type: "SET_CART_ITEMS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
