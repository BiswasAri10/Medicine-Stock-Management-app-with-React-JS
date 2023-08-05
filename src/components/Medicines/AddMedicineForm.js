import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddMedicineForm.module.css";

const AddMedicine = (props) => {
  const [error, setError] = useState(null);

  const medicineNameInputRef = useRef();
  const medicineDescriptionInputRef = useRef();
  const medicinePriceInputRef = useRef();
  const medicineQuantityInputRef = useRef();

  const addMedicineHandler = async (event) => {
    event.preventDefault();
    const enteredMedicineName = medicineNameInputRef.current.value;
    const enteredMedicineDescription = medicineDescriptionInputRef.current.value;
    const enteredMedicinePrice = medicinePriceInputRef.current.value;
    const enteredMedicineQuantity = medicineQuantityInputRef.current.value;

    if (
      enteredMedicineName.trim().length === 0 ||
      enteredMedicineDescription.trim().length === 0 ||
      enteredMedicinePrice.trim().length === 0 ||
      enteredMedicineQuantity.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter valid values for all fields (non-empty values).",
      });
      return;
    }
    if (+enteredMedicinePrice < 1) {
      setError({
        title: "Invalid Price",
        message: "Please enter a valid price (> 0).",
      });
      return;
    }

    const medicineData = {
      name: enteredMedicineName,
      description: enteredMedicineDescription,
      price: +enteredMedicinePrice,
      quantity: +enteredMedicineQuantity,
    };

    try {
      const response = await fetch("https://crudcrud.com/api/d7b342f0641e412f861842737268b245/medicineStock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicineData),
      });

      if (!response.ok) {
        throw new Error("Failed to send medicine data.");
      }

      const responseData = await response.json();
      props.onAddMedicine(responseData); 
    } catch (error) {
      setError({
        title: "Error",
        message: "An error occurred while sending the medicine data.",
      });
    }

    medicineNameInputRef.current.value = "";
    medicineDescriptionInputRef.current.value = "";
    medicinePriceInputRef.current.value = "";
    medicineQuantityInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addMedicineHandler}>
          <label htmlFor="medicineName">Medicine Name</label>
          <input id="medicineName" type="text" ref={medicineNameInputRef} />
          <label htmlFor="medicineDescription">Description</label>
          <input
            id="medicineDescription"
            type="text"
            ref={medicineDescriptionInputRef}
          />
          <label htmlFor="medicinePrice">Price</label>
          <input id="medicinePrice" type="number" ref={medicinePriceInputRef} />
          <label htmlFor="medicineQuantity">Quantity</label>
          <input
            id="medicineQuantity"
            type="number"
            ref={medicineQuantityInputRef}
          />
          <Button type="submit">Add Medicine</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddMedicine;
