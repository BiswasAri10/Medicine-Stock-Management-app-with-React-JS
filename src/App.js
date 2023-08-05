import React, { useState } from "react";
import AddMedicine from "./components/Medicines/AddMedicineForm";
import MedicinesList from "./components/Medicines/AvailableMedicineList";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./components/store/cart-context";

const App = () => {
  const [medicines, setMedicines] = useState([]);

  const addMedicineHandler = (medicineData) => {
    const existingMedicine = medicines.find(
      (medicine) =>
        medicine.name === medicineData.name &&
        medicine.description === medicineData.description &&
        medicine.price === medicineData.price
    );

    if (existingMedicine) {
      setMedicines((prevMedicines) =>
        prevMedicines.map((medicine) =>
          medicine.id === existingMedicine.id
            ? {
                ...medicine,
                quantity: medicine.quantity + medicineData.quantity,
              }
            : medicine
        )
      );
    } else {
      setMedicines((prevMedicines) => [...prevMedicines, medicineData]);
    }
  };

  const updateMedicineQuantity = (medicineId, quantity) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((medicine) =>
        medicine.id === medicineId
          ? { ...medicine, quantity: medicine.quantity + quantity }
          : medicine
      )
    );
  };

  return (
    <CartProvider updateMedicineQuantity={updateMedicineQuantity}>
      <div>
        <h1>Medical Store</h1>
        <AddMedicine onAddMedicine={addMedicineHandler} />
        <MedicinesList medicines={medicines} setMedicines={setMedicines} />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
