import React, {useContext} from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AvailableMedicineList.module.css';
import { CartContext } from '../store/cart-context';

const MedicinesList = (props) => {
  const { addToCart } = useContext(CartContext);

  const handleBuyMedicine = (medicine) => {
    if (medicine.quantity > 0) {
      addToCart(medicine);
      props.setMedicines((prevMedicines) =>
        prevMedicines.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <Card className={classes.medicines}>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Medicine Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.description}</td>
              <td>{medicine.price}</td>
              <td>{medicine.quantity}</td>
              <td>
                <Button
                  onClick={() => handleBuyMedicine(medicine)}
                  disabled={medicine.quantity === 0}
                >
                  Buy Medicine
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default MedicinesList;
