import React from 'react';
import Card from '../UI/Card';
import classes from './AvailableMedicineList.module.css';

const MedicinesList = (props) => {
  return (
    <Card className={classes.medicines}>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Medicine Description</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {props.medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.description}</td>
              <td>{medicine.price}</td>
              <td>{medicine.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default MedicinesList;
