import './App.css';
import React from "react";
import {useState, useEffect} from "react";

//Store/Retrieve data into/from local storage
const { localStorage } = window;
    
const getEmployeeValues=() => {
const storedValues = localStorage.getItem('employees');
if (storedValues){
  return JSON.parse(storedValues);  
}
else{
  return[]
}

} 

const EmpForm = () => {

  const [employees, setEmployees]= useState(getEmployeeValues()); 

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [id_no, setIdNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [emp_position, setEmpPosition] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddEmployeeSubmit=(event)=>{
    event.preventDefault();

    let employee={
        name, 
        surname, 
        id_no, 
        email, 
        phone_no,
        emp_position 
    }   

    setEmployees ([employees,employee]);
    setName('');
    setSurname(''); 
    setIdNo('');
    setEmail('');
    setPhoneNo('');
    setEmpPosition('')
  }

  //delete an employee
  const deleteEmployee=(name)=>{
    const filteredEmployees=employees.filter((element,index)=>{
      return element.name !== name
    })
    setEmployees(filteredEmployees);
  }
  
    //store data into local storage
    useEffect(() => {
      localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);


    //Insert image
    function ImageInput() {
      const handleImageChange = (event) => {
          const file = event.target.files[0];
          setSelectedImage(URL.createObjectURL(file));
        };
      
        return (
          <div>
            <form><label>Insert image: <input className="image_input"placeholder="Insert image" type="file" accept="image/*" onChange={handleImageChange} /></label></form>
            {selectedImage && <img src={selectedImage} alt="Selected" />}
          </div>
        );
      }

    console.log(employees);

    return (
        //Retrieve all the input data using the input,button and select tags
        <div className="container">

          <h3>Employee Tracker</h3>
            <div> </div>
            <h1>Add a new employee</h1>

            <form autoComplete="off" onSubmit={handleAddEmployeeSubmit}> 
            <label>Name:</label><br></br>
            <input type="text" placeholder="Enter name" onChange={(e)=> setName(e.target.value)} /><br></br>
            <label>Surname:</label><br></br>
            <input type="text" placeholder="Enter surname" onChange={(e)=> setSurname(e.target.value)} /> <br></br>
            <label>Identity no:</label><br></br>
            <input type="text" placeholder="Enter ID number" onChange={(e)=> setIdNo(e.target.value)} /> <br></br>
            <label>Email address:</label><br></br>
            <input type="text" placeholder="Enter email address" onChange={(e)=> setEmail(e.target.value)} /> <br></br>
            <label>Phone number:</label><br></br>
            <input type="text" placeholder="Enter phone number" onChange={(e)=> setPhoneNo(e.target.value)} /> <br></br>
            <label>Position:</label><br></br>
            <select onClick={(e)=> setEmpPosition(e.target.value)}> 
                <option>Select Employee Title</option>
                <option>Programmer</option>
                <option>Trainee</option>
                <option>Web Developer</option>
                <option>Software Developer</option>
                <option>Project Manager</option>
                <option>System Administrator</option>
                <option>Technician</option>
                <option>Manager</option>
            </select>  <br></br>
            <>
                <ImageInput selectedImage={selectedImage}/>
            </>
            <button type="submit" className='submit-button'>Save</button> 
            </form>
            <div>
            {employees.length>0&&<>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>ID #</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Position</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                 




                </table>
              </div>
              <>
              <button className='Btn-remove' onClick={()=>deleteEmployee([])}>Remove</button> <br></br>
              </>
              <button className='Btn-remove-all'
              onClick={()=>setEmployees([])}>Remove All</button>
            </>}
            {employees.length < 1 && <div className='list_details'>No employees on the database</div>}
            </div>

        </div>
        
    )

} 
export default EmpForm;
