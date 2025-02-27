import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import HamburgerMenu from "../components/HamburgerMenu"
import "../themes/Profiles.css";


function NewProfile() {

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [child, setChild] = useState('');
  const [age, setAge] = useState('');
  const [admin, setAdmin] = useState(false);
  const [image, setImage] = useState(null);  // State for image

  // Get the JWT token from localStorage
  const token = localStorage.getItem('jwtToken');

  // Decode the JWT token (using a library like jwt-decode)
  const decodedToken = token ? jwt_decode(token) : null;
  const accountEmail = decodedToken ? decodedToken.accountEmail : '';

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if ( !password || !firstname || !lastname ) {
      alert('Please fill out all required fields.');
      return;
    }

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('accountEmail', accountEmail);
    formData.append('userEmail', userEmail);
    formData.append('password', password);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('phonenumber', phonenumber);
    formData.append('child', child);
    formData.append('age', age);
    formData.append('admin', admin);

    formData.append('isActive', child === 'Yes' ? true : false);

    if (image) {
      formData.append('image', image); // Append the selected image
    }

    try {
      // Send the data to the backend using Axios
      const response = await axios.post('http://localhost:3001/api/user/', formData, {
        headers: {
            'Authorization': `Bearer ${token}` // Send token in the header for validation
        }
    });
        // Handle success (e.g., notify the user, update state, etc.)
      if (response.status === 201) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      // Handle error
      console.error('There was an error updating the profile!', error);
      alert('Error updating profile!');
    }
  };

   // Handle image file selection
   const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file as image
  };

  // Handle selection change in Form.Select
  const handleSelectChange = (e) => {
    setChild(e.target.value);  // Update the option state with the selected value
  };

    return (
        <div className="container">

          <HamburgerMenu />

        <Form className="form" onSubmit={handleSubmit}>
          <Row className="mb-3">

            <h2>Add A New Profile</h2>

            <Form.Group as={Col} controlId="formGriduserEmail">
              <Form.Label> Personal Email</Form.Label>
              <Form.Control type="userEmail" placeholder="Enter personal email" value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)} />
            </Form.Group>
  
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label> Set Password</Form.Label>
              <Form.Control type="password" placeholder="New password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
          </Row>
  
          <Form.Group className="mb-3" controlId="formGridFirstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control placeholder="Firstname" value={firstname}
              onChange={(e) => setFirstname(e.target.value)}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formGridLastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control placeholder="Lastname" value={lastname}
              onChange={(e) => setLastname(e.target.value)}/>
          </Form.Group>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control placeholder="Mobile" value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}/>
            </Form.Group>
  
            <Form.Group as={Col} controlId="formGridChild">
              <Form.Label>Child</Form.Label>
              <Form.Select value={child} onChange={handleSelectChange}>
                <option value="">Choose...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Select>
            </Form.Group>
  
            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label>Age</Form.Label>
              <Form.Control placeholder="Age" value={age}
              onChange={(e) => setAge(e.target.value)}/>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridPhoto">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control 
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              />
            </Form.Group>
  
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Admin User "
            checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
          </Form.Group>
  
          <Button className="button" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
  
  export default NewProfile;