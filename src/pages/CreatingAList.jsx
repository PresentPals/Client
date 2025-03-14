import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";

const EventForm = () => {
  //Get the token from localStorage and decode it to get the accountEmail from the user logged in:
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const accountEmail = decodedToken ? decodedToken.accountEmail : "";
// set the state hooks for a gift list and users
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    accountEmail: accountEmail,
    giftListTitle: "",
    dateEvent: "",
    listDescription: "",
    childUser: "",
    privateList: false,
  });

  useEffect(() => {
    if (!token) {
      alert("No security token, please log back into the application.");
      return;
    }
    // fetch the user data from the db for filtering the child users
  const fetchChildUsers = async () => {
    try {
      const response = await axios.get("https://server-9w3v.onrender.com/api/user/", {

        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("API Response:", response.data);
      const fetchedUsers = Array.isArray(response.data.users) ? response.data.users : [];
      // set the users with fetched data.
      setUsers(fetchedUsers);
    } catch (error) {
      alert("Error fetching chid users from the server:", error);
    }
  };

  fetchChildUsers();
  }, [token]);
// set the data from inputs 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
// handle when the submit button is selected
  const handleSubmit = async (e) => {
    e.preventDefault();
// alert users the child selection dropdown cannot be blank
    if (formData.childUser === "") {
      alert("A child recipient of this event list must be selected. Please choose an option.");
      return;
    }
    // send the data to the frontend
    try {
      const response = await axios.post(
        "https://server-9w3v.onrender.com/api/giftlist/event",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert the responses from backend
      const data = response.data;
      if (response.status === 201) {
        alert("Event list created successfully!");
        setTimeout(() => {
          navigate("/api/giftlist"); // Redirect to events page after saved
        }, 1000);
      } else if (response.status === 400 && data.message){
        alert(data.message)
      } else if (response.status === 401 && data.message){
        alert(data.message)
      } else if (response.status === 403 && data.message){
        alert(data.message)
      } else if (response.status === 500){
        alert("There is a error / no connection with the server.  Please contact your admin.")
      } else {
        alert("Something went wrong. Please try again.");
      }  
      // set the state form  back to default / blank.
      setFormData({
        accountEmail: accountEmail,
        giftListTitle: "",
        dateEvent: "",
        listDescription: "",
        childUser: "",
        privateList: false,
      });

    } catch (error) {
      alert("There was an error updating the event list!", error);
    }

    
  };
  // filter & assign where users child = true
  const childUsers = Array.isArray(users) ? users.filter((user) => user.child) : []; 

  return (
    <div className="vh-100 vw-100 bg-image"
    style={{
      backgroundImage: "url(/Background2.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
    }}>
    <HamburgerMenu />
    <form className="mt-5"onSubmit={handleSubmit} style={formStyle}>
      <h2>Create Event List</h2>

      {/* Title */}
      <label>Title:</label>
      <input
        type="text"
        name="giftListTitle"
        value={formData.giftListTitle}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Event Date */}
      <label>Event Date:</label>
      <input
        type="date"
        name="dateEvent"
        value={formData.dateEvent}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* eventDescription */}
      <label>Event Description:</label>
      <textarea
        name="listDescription"
        value={formData.listDescription}
        onChange={handleChange}
        required
        style={textAreaStyle}
      />

      {/* Recipients of the List */}
      <label>Child Recipient of this Event List:</label>
      <div style={childGroupStyle}>
        <div>
          <select
            name="childUser"
            required
            value={formData.childUser}
            onChange={(e) => setFormData({ ...formData, childUser: e.target.value })}
          >
            <option value="">-- Select Child --</option>
            {childUsers.length > 0 ? (
              childUsers.map((user, index) => (
                <option key={index} value={user.userName}>
                  {user.userName}
                </option>
              ))
            ) : (
              <option disabled>No children available</option>
            )}
          </select>
        </div>
        {/* <label>
          <input
            type="radio"
            name="recipient"
            value="Someone Else"
            checked={formData.recipient === 'Someone Else'}
            onChange={handleChange}
          />{' '}
          Someone Else
        </label> */}
      </div>

      {/* Private List Checkbox */}
      {/* <label>
        <input
          type="checkbox"
          name="privateList"
          checked={formData.privateList}
          onChange={handleChange}
        />{' '}
        Private List
      </label> */}

      {/* Save List Button */}
      <button type="submit" style={buttonStyle}>
        Save Event List
      </button>
    </form>
    </div>
  );
};

// Inline Styles
const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
};

const inputStyle = {
  padding: "8px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const textAreaStyle = {
  ...inputStyle,
  height: "80px",
};

const childGroupStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#28E3DE",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default EventForm;
