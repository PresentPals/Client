import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";

const EventForm = () => {
  //Get the JWT token from localStorage
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const accountEmail = decodedToken ? decodedToken.accountEmail : "";

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
    if (!token) return;

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/user/", {

        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);
      const fetchedUsers = Array.isArray(response.data.users) ? response.data.users : [];
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.childUser === "") {
      alert("A child recipient of this event list has not been selected. Please choose an option.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/giftlist/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Event list created successfully!");
      } else {
        alert("Something went wrong. Please try again.");
      }  

      setFormData({
        accountEmail: accountEmail,
        giftListTitle: "",
        dateEvent: "",
        listDescription: "",
        childUser: "",
        privateList: false,
      });

    } catch (error) {
      console.error("There was an error updating the event list!", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Error updating profile!");
      }
    }

    
  };

  // const parentUsers = users.filter((user) => !user.child); // Users where child = false
  
  const childUsers = Array.isArray(users) ? users.filter((user) => user.child) : []; // Users where child = true

  return (
    <div>
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
