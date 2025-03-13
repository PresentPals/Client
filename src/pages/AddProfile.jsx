import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";
import AvatarSelection from "../components/CreateAvatar";

function NewProfile() {
  // set the new profiles state hooks
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [child, setChild] = useState("Yes");
  const [age, setAge] = useState("");
  const [admin, setAdmin] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  //Get the token from localStorage & decode what accountEmail has been assigned from user that logged in:
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const accountEmail = decodedToken ? decodedToken.accountEmail : "";

  // Handle the form submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    //check the required fields are entered
    if (!userName || !password || !firstname || !lastname) {
      alert(
        "Please fill out the required fields of User Name, Password, First Name, Last Name."
      );
      return;
    }
    // check password is valid
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    // Create a data object to send to the backend
    const data = {
      accountEmail: accountEmail,
      userName: userName,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      age: age,
      admin: admin,
      child: child === "Yes" ? true : false, // Convert 'Yes'/'No' to true/false
      userImage: selectedAvatar,
    };

    try {
      // send the data object to the backend
      const response = await axios.post(
        "https://server-5d6r.onrender.com:5001/api/user/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = response.data;
      if (response.status === 201 && resData.message) {
        alert(resData.message);
        setTimeout(() => {
          navigate("/api/user"); // Redirect to profiles page after saved
        }, 1000);
      } else if (response.status === 400 && resData && resData.message){
        alert(resData.message)
      } else if (response.status === 401 && resData && resData.message){
        alert(resData.message)
      } else if (response.status === 403 && resData && resData.message){
        alert(resData.message)
      } else if (response.status === 500){
        alert("There is a error / no connection with the server.  Please contact your admin.")
      } else {
        alert("Add new profile failed, please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };
  // Handle selection change in the child selection dropdown
  const handleSelectChange = (e) => {
    setChild(e.target.value);
  };
  // Handle avatar selection from AvatarSelection component
  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/ppals_logo.png" />
        <h2>Add Profile</h2>
        {/* Avatar Selection */}
        <AvatarSelection onAvatarSelect={handleAvatarSelection} />
        <br></br>
        <form
          className="d-flex flex-column justify-content-center align-items-center"
          onSubmit={handleSubmit}
        >
          <label style={{ marginBottom: "0.5rem" }}>Your User Name:</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            style={{ marginBottom: "1rem", width: "220px" }}
          />

          <label style={{ marginBottom: "0.5rem" }}>Your Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password text must be 8 or more."
            style={{
              marginBottom: "1rem",
              width: "220px",
              height: "30px",
              fontSize: "12px",
            }}
          />

          <label style={{ marginBottom: "0.5rem" }}>Your First Name:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            style={{ marginBottom: "1rem", width: "220px" }}
          />

          <label style={{ marginBottom: "0.5rem" }}>Your Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
            style={{ marginBottom: "1rem", width: "220px" }}
          />

          <label style={{ marginBottom: "0.5rem" }}>Your Mobile Number:</label>
          <input
            type="text"
            name="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="Mobile Number"
            style={{ marginBottom: "1rem", width: "220px" }}
          />

          <label style={{ marginBottom: "0.5rem" }}>Set Admin status:</label>
          <input
            type="checkbox"
            label="Admin User"
            checked={admin}
            onChange={(e) => setAdmin(e.target.checked)}
            style={{ marginBottom: "1rem" }}
          />

          <label style={{ marginBottom: "0.5rem" }}>Child user setting.</label>
          <label htmlFor="Child" style={{ marginBottom: "0.5rem" }}>
            Choose an option:
          </label>
          <select
            id="Child"
            name="Are you a child?"
            value={child}
            onChange={handleSelectChange}
            style={{ marginBottom: "1rem", width: "220px" }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label style={{ marginBottom: "0.5rem" }}>Your Age:</label>
          <input
            type="text"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            style={{ marginBottom: "1rem", width: "220px" }}
          />

          <button
            className="btn btn-success"
            variant="primary"
            type="submit"
            style={{ marginBottom: "1rem" }}
          >
            Save Profile.
          </button>

          <Link to="/api/user">
            <button
              className="btn btn-warning"
              style={{ marginBottom: "1rem" }}
            >
              Cancel / Back.
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default NewProfile;
