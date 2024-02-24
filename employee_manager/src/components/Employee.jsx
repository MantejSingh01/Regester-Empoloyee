import React, { useState } from "react";
import axios from 'axios';
import { host } from "../constant/constants";
import { useEffect } from "react";

const Employee = ({ employee, index, onSave, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const [photo, setPhoto] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
   
        const employeeId = employee._id;
        const employeeObj = {
            name:editedEmployee.name,
            email:editedEmployee.email,
            address:editedEmployee.address,
            dateOfBirth:"",
            photo:photo || null,
            userId:employeeId
        }
    console.log(index, editedEmployee);

    onSave(index, employeeObj);
  setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setPhoto(null);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {

    
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageBlob = reader.result;
      console.log("imageBlob",imageBlob)
      setPhoto(imageBlob)
      
    };
    if (file) {
        reader.readAsDataURL(file);
      }
  };

  return (
    <div className="employee">
      {isEditing ? (
        <div>
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={editedEmployee.name}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="email"
            name="email"
            value={editedEmployee.email}
            placeholder="Emter email"
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="date"
            name="dob"
            value={editedEmployee.dob}
            onChange={handleChange}
          />
          <textarea
            className="input-field"
            type="text"
            name="address"
            placeholder="enter address"
            value={editedEmployee.address}
            onChange={handleChange}
          />
          <input
            className="input-field-file"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <div className="button-container">
            <button className="action-button save" onClick={handleSave}>
              Save
            </button>
            <button className="action-button cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="list-container">
          <div className="img-contaier">
            {employee.photo && (
              <img
                src={employee.photo}
                alt={employee.name}
                className="employee-photo"
              />
            )}
          </div>
          <div className="details-container">
            <div className="employee-detail">Name: {employee.name}</div>
            <div className="employee-detail">Email: {employee.email}</div>
            {employee.dob && (
              <div className="employee-detail">
                Date of Birth: {employee.dob}
              </div>
            )}
            {employee.address && (
              <div className="employee-detail">Address: {employee.address}</div>
            )}
            <div className="button-container">
              <button className="action-button edit" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="action-button delete"
                onClick={() => onDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
