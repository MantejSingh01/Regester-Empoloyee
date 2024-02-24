import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

const EmployeeContext = React.createContext();

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children, host }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${host}/getAllEmployee`);
      setEmployees(response.data.employeeDetails);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await axios.post(`${host}/addEmployee`, employee);
      setEmployees([...employees, response.data.registerEmployeeDetails]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const editEmployee = async (index, updatedEmployee) => {
    try {
      
      const response = await axios.post(`${host}/updateEmployee`, updatedEmployee);
      const updatedEmployees = [...employees];
      updatedEmployees[index] = response.data.employeeDetails;
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error editing employee:', error);
    }
  };

  const deleteEmployee = async (index) => {
    try {
      const employeeId = employees[index]._id;
      console.log(employees[index]);
  
      await axios.put(`${host}/deleteEmployee/${employeeId}`, { isDeleted: true });
  
      const updatedEmployees = [...employees];
      updatedEmployees.splice(index, 1);
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  
  };
  const checkIfEmailExists = (email) =>{
    return employees.some(obj=>obj.email===email);
  }
  

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, editEmployee, deleteEmployee , checkIfEmailExists }}>
      {children}
    </EmployeeContext.Provider>
  );
};
