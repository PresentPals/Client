import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "../styling/Profiles.css";
import HamburgerMenu from "../components/HamburgerMenu";

function NewProfile() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [child, setChild] = useState("");
  const [age, setAge] = useState("");
  const [admin, setAdmin] = useState(false);
  const [userImage, setUserImage] = useState();

  //Get the JWT token from localStorage
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const accountEmail = decodedToken ? decodedToken.accountEmail : "";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!password || !firstname || !lastname) {
      alert("Please fill out all required fields.");
      return;
    }
    // Create a data object to handle file upload
    const data = {
      accountEmail: accountEmail,
      userEmail: userEmail,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      age: age,
      admin: admin,
      child: child === "Yes" ? true : false, // Convert 'Yes'/'No' to true/false
      userImage: userImage
    };
    

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/add",
        data,
        {
          headers: {
            "Content-Type": "application/json", 
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      alert("Error updating profile!");
    }
  };
  // Handle selection change in Form.Select
  const handleSelectChange = (e) => {
    setChild(e.target.value);
  };

  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="container">
        <img src="ppals_logo.png" />
        <h2>Add Profile</h2>
        <form className="vertical-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder=" Your Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="number"
            name="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="Mobile Number"
          />
          <input
            type="checkbox"
            label="Admin User"
            checked={admin}
            onChange={(e) => setAdmin(e.target.checked)}
          />
          <label htmlFor="Child">Choose an option:</label>
          <select id="Child" name="Are you a chiild ?" value={child} onChange={handleSelectChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />
          <button variant="primary" type="submit">Add Profile</button>
        </form>
      </div>
    </div>
  );
};

export default NewProfile;
