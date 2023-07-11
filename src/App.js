import React, { useState, Fragment } from 'react';

import AddMedicine from './components/Medicines/AddMedicineForm';
import MedicinesList from './components/Medicines/AvailableMedicineList';

function App() {
  const [medicinesList, setMedicinesList] = useState([]);

  const addMedicineHandler = (medicineData) => {
    setMedicinesList((prevMedicinesList) => {
      return [
        ...prevMedicinesList,
        { ...medicineData, id: Math.random().toString() },
      ];
    });
  };

  return (
    <Fragment>
      <AddMedicine onAddMedicine={addMedicineHandler} />
      <MedicinesList medicines={medicinesList} />
    </Fragment>
  );
}

export default App;
