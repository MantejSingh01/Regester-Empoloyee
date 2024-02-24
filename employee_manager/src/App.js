import React, { useState } from "react";
import { useEmployee } from "./context/EmployeeProvider";
import Modal from "./components/Modal";
import Employee from "./components/Employee";
import "./App.css";
import ParticleBg from "./particleBg";

const App = () => {
  const { employees, addEmployee, editEmployee, deleteEmployee , checkIfEmailExists } =
    useEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
    setEditEmployeeData(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddEmployee = (employee) => {
    addEmployee(employee);
  };

  const handleEditEmployee = (employee) => {
    editEmployee(editEmployeeData.index, employee);
    closeModal();
  };

  const handleDeleteEmployee = (index) => {
    deleteEmployee(index);
  };

  const handleSaveEmployee = (index, payload)=>{
    editEmployee(index, payload)
  }

  return (
    <div className="app">
      <ParticleBg></ParticleBg>
      <h1 className="heading">Employee Management</h1>
      <button className="add-employee-button" onClick={openModal}>
        Add Employee
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editEmployeeData ? handleEditEmployee : handleAddEmployee}
        employee={editEmployeeData ? editEmployeeData.employee : null}
        checkIfEmailExists = {checkIfEmailExists}
      />
      <div className="employee-list-container">
        <div className="employee-list">
          {employees.length >0 ? employees.map((employee, index) => (
            <Employee
              key={index}
              employee={employee}
              index={index}
              onEdit={(index, employee) => setEditEmployeeData({ employee, index })}
              onSave = {handleSaveEmployee}
              onDelete={handleDeleteEmployee}
            />
          )):<div className="no-result">No Results found for Employees !!</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
