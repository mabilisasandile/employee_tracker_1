import '../App.css';
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Component } from 'react';

const Display = (employees) => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('employees');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setLocalStorageData(parsedData);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        console.error('Error parsing data from local storage:', error);
      }
    }
  }, []);

  
  function HandleDeleteEmployee(index){
    // Remove the desired element from the array
    const updatedArray = [...localStorageData];
    updatedArray.splice(index, 1);

    // Store the updated array back into local storage
    localStorage.setItem('employees', JSON.stringify(updatedArray));

    // Update the application data with the updated array
    setLocalStorageData(updatedArray);
  }


  function updateProfile() {
    navigate("/Update")
  }

 
  return (
    <div>
      <h1>Local Storage Data</h1>
      {localStorageData.length > 0 ? (
        <table className='empTable'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>ID #</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {localStorageData.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.id_no}</td>
                <td>{employee.email}</td>
                <td>{employee.phone_no}</td>
                <td>{employee.emp_position}</td>
                <td><button className='Btn-populate' onClick={updateProfile}>Update</button></td>
                <td><button className='Btn-remove' onClick={() => HandleDeleteEmployee(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found in local storage.</p>
      )}

    </div>
  );

}
export default Display;