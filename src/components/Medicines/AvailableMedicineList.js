import React, { useContext, useState, useEffect } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AvailableMedicineList.module.css";
import { CartContext } from "../store/cart-context";

const MedicinesList = (props) => {
  const { addToCart } = useContext(CartContext);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch(
      "https://crudcrud.com/api/d7b342f0641e412f861842737268b245/medicineStock"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch medicines.");
        }
        return response.json();
      })
      .then((data) => {
        setMedicines(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleaddToCart = (medicine) => {
    if (medicine.quantity > 0) {
      fetch(
        `https://crudcrud.com/api/d7b342f0641e412f861842737268b245/medicineStock/${medicine._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: medicine.quantity - 1,
            name: medicine.name,
            description: medicine.description,
            price: medicine.price,
          }),
        }
      )
        .then((response) => response.json())
        .then((updatedMedicine) => {
          setMedicines((prevMedicines) =>
            prevMedicines.map((item) =>
              item._id === updatedMedicine._id ? { ...updatedMedicine } : item
            )
          );

          addToCart(updatedMedicine); 
        })
        .catch((error) => {
          console.error("Failed to update quantity on server:", error);
        });
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
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.name}</td>
              <td>{medicine.description}</td>
              <td>{medicine.price}</td>
              <td>{medicine.quantity}</td>
              <td>
                {medicine.quantity > 0 ? (
                  <Button onClick={() => handleaddToCart(medicine)}>
                    Buy Medicine
                  </Button>
                ) : (
                  <span>Out of Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default MedicinesList;
