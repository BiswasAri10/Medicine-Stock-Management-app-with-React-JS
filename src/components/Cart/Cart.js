import { useContext, useState } from "react";
import { CartContext } from "../store/cart-context";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [medicines, setMedicines] = useState([]); 

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);
    setMedicines((prevMedicines) =>
      prevMedicines.map((medicine) =>
        medicine.id === item.id
          ? { ...medicine, quantity: medicine.quantity + 1 }
          : medicine
      )
    );
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
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
