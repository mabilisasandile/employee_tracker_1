import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import Image from './components/Image';
import { useNavigate } from 'react-router-dom';

const App = (props) => {
  //Get data from local storage
  const emp = JSON.parse(localStorage.getItem('employees')) || [];

  const navigate = useNavigate();
  const [employees, setEmployees] = useState(emp);
  let tempData = [];

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [id_no, setIdNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [emp_position, setEmpPosition] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const [searcheData, setSearcheData] = useState({
		name: '',
		surname: '',
		email: '',
		phone_no: '',
    emp_position:'',
    selectedImage:''
	})

  const handleAddEmployeeSubmit = (event) => {
    event.preventDefault();

    let employee = {
      name,
      surname,
      id_no,
      email,
      phone_no,
      emp_position,
      selectedImage
    }
    console.log(employees);
    alert(name + ' has been successfully added.')

    setEmployees((employees) => [...employees, { name: name, surname: surname, id_no: id_no, email: email, phone_no: phone_no, emp_position: emp_position, selectedImage: selectedImage }]);

  }

  //store data into local storage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  function display() {
    navigate("./Display")
  }

  function updateProfile() {
    navigate("./Update")
  }

  console.log(localStorage.getItem("employees"), "Data from Local Storage");


  //Delete all employees
  const deleteAllData = () => {
    localStorage.removeItem('employees');
  };


  //Search employee from local storage
  const Search = () => {
		const [searchTerm, setSearchTerm] = useState('');

		const handleInputTerm = (event) => {
			setSearchTerm(event.target.value);
		};

		const handleSearch = () => {
			const data = JSON.parse(localStorage.getItem('employees'));

			tempData = data.filter(index => {
				return index.id_no === searchTerm;
			})

      if (tempData.length === 0) {
        // Handle no matching data found exception
        console.log('No matching data found.');
        alert('No matching data found, re-enter ID no...');    
    } else {
        console.log('Searched task:', tempData[0]);

        setSearcheData({
            name: tempData[0].name,
            surname: tempData[0].surname,
            id_no: tempData[0].id_no,
            email: tempData[0].email,
            phone_no: tempData[0].phone_no,
            emp_position: tempData[0].emp_position,
            selectedImage: tempData[0].selectedImage,
        });

        setName(tempData[0].name);
        setSurname(tempData[0].surname);
        setIdNo(tempData[0].id_no);
        setEmail(tempData[0].email);
        setPhoneNo(tempData[0].phone_no);
        setEmpPosition(tempData[0].emp_position);
        setSelectedImage(tempData[0].selectedImage);
    }
		}

		return (
			<div>
				<table>
					<tr>
						<td>
							<input
								className='search-input'
								type="text"
								placeholder="Search employee..."
								value={searchTerm}
								onChange={handleInputTerm}
							/>
							<button className='Btn-search' onClick={handleSearch} >
								Search
							</button>
						</td>
					</tr>
				</table>
			</div>
		);
	};


  return (
    //Retrieve all the input data using the input,button and select tags
    <div className="container">
      <h3>Employee Tracker</h3>
      <div>
        <Search /><br></br>
      </div>
      <div> </div>
      <h1>Add a new employee</h1>
      <form autoComplete="off">

        <label>Name:</label><br></br>
        <input type="text" 
        placeholder={searcheData.name === '' ? "Enter name" : searcheData.name} 
        id="name" 
        onChange={(e) => setName(e.target.value)} /><br></br>

        <label>Surname:</label><br></br>
        <input type="text" 
        placeholder={searcheData.surname === '' ? "Enter surname" : searcheData.surname} 
        id="surname" 
        onChange={(e) => setSurname(e.target.value)} /> <br></br>
        
        <label>Identity no:</label><br></br>
        <input type="text" 
        placeholder={searcheData.id_no === '' ? "Enter ID number" : searcheData.id_no}
        id="id-number" 
        onChange={(e) => setIdNo(e.target.value)} /> <br></br>
        
        <label>Email address:</label><br></br>
        <input type="email" 
        placeholder={searcheData.email === '' ? "Enter email" : searcheData.email} 
        id="email" 
        onChange={(e) => setEmail(e.target.value)} /> <br></br>
        
        <label>Phone number:</label><br></br>
        <input type="text" 
        placeholder={searcheData.phone_no === '' ? "Enter phone number" : searcheData.phone_no} 
        id="phone" 
        onChange={(e) => setPhoneNo(e.target.value)} /> <br></br>
        
        <label>Position:</label><br></br>
        <select onClick={(e) => setEmpPosition(e.target.value)} id="position">
          <option>{searcheData.emp_position === '' ? "Select" : searcheData.emp_position}</option>
          <option>Trainee</option>
          <option>Software Developer</option>
          <option>Administrator</option>
          <option>Technician</option>
          <option>General Assistant</option>
        </select>  <br></br>
        <div>
          <Image selectedImage={selectedImage} />
        </div>

        <button type="submit" className='submit-button' onClick={handleAddEmployeeSubmit}>Save</button>
      </form>

      <div>
        <button className='Btn-display' onClick={display}>Show all employees</button>
      </div>

      <div>
        <button className='Btn-update' onClick={updateProfile} >Update Employee Profile</button>
      </div>

      <div>
        <button className='Btn-remove-all' onClick={deleteAllData}>Delete All Data</button>
      </div>

    </div>

  );

}
export default App;
