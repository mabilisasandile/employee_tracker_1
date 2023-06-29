
import '../App.css';
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from './Image';

const Update = (props) => {

    const navigate = useNavigate();
    let tempData = [];

    const [searcheData, setSearcheData] = useState({
        name: '',
        surname: '',
        email: '',
        phone_no: '',
        emp_position: '',
        selectedImage: ''
    })

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [id_no, setIdNo] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [emp_position, setEmpPosition] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [dataArray, setDataArray] = useState([]);

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
                                    placeholder="Search (ID NO.) to proceed with update"
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
        }

        useEffect(() => {
            // Retrieve existing array data from local storage
            const storedData = JSON.parse(localStorage.getItem('employees')) || [];
            setDataArray(storedData);
        }, []);

        //Update
        const handleInputChange = (index) => {

            // Modify the desired element in the array
            const updatedArray = dataArray.map(element => {
                if (element.id_no === id_no) {
                    return { ...element, name: name, surname: surname, email: email, phone_no: phone_no, emp_position: emp_position, selectedImage: selectedImage }

                }
                return element
            })

            //Store the updated array back into local storage
            localStorage.setItem('employees', JSON.stringify(updatedArray));

            setDataArray(updatedArray);
        };

        // Go to all employees page
        function display() {
            navigate("/Display")
        }


        return (
            <div className="container">
                <h3>Employee Tracker</h3>
                <div>
                    <Search /><br></br>
                </div>
                <div> </div>
                <h1>Update employee profile</h1>
                <form autoComplete="off">

                    <label>Name:</label><br></br>
                    <input type="text"
                        placeholder={searcheData.name === '' ? "NAME" : searcheData.name}
                        id="name"
                        onChange={(e) => setName(e.target.value)} /><br></br>

                    <label>Surname:</label><br></br>
                    <input type="text"
                        placeholder={searcheData.surname === '' ? "SURNAME" : searcheData.surname}
                        id="surname"
                        onChange={(e) => setSurname(e.target.value)} /> <br></br>

                    <label>Identity no:</label><br></br>
                    <input type="text"
                        placeholder={searcheData.id_no === '' ? "ID NO." : searcheData.id_no}
                        id="id-number"
                        onChange={(e) => setIdNo(e.target.value)} /> <br></br>

                    <label>Email address:</label><br></br>
                    <input type="email"
                        placeholder={searcheData.email === '' ? "EMAIL" : searcheData.email}
                        id="email"
                        onChange={(e) => setEmail(e.target.value)} /> <br></br>

                    <label>Phone number:</label><br></br>
                    <input type="text"
                        placeholder={searcheData.phone_no === '' ? "PHONE NO." : searcheData.phone_no}
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

                    <button type="submit" className='submit-button' onClick={handleInputChange}>Confirm New Changes</button>
                </form>

                <div>
                    <button className='Btn-display' onClick={display}>Show all employees</button>
                </div>

            </div>

        );


    }
    export default Update;