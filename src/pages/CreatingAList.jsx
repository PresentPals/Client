import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";




function EventForm () {}
  const [formData, setFormData] = useState({
    title: '',
    eventDate: '',
    description: '',
    recipient: '', // Default selection // Need to com back to this section and update
    privateList: false // Need to comeback and update with details on how to share the list
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('List Saved Successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Create Event List</h2>

      {/* Title */}
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Event Date */}
      <label>Event Date:</label>
      <input
        type="date"
        name="eventDate"
        value={formData.eventDate}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Description */}
      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        style={textAreaStyle}
      />

      {/* Recipients of the List */}
      <label>Recipients of the List:</label>
      <div style={radioGroupStyle}>
        <label>
          <input
            type="radio"
            name="recipient"
            value="Me"
            checked={formData.recipient === 'Me'}
            onChange={handleChange}
          />{' '}
          Me
        </label>
        <label>
          <input
            type="radio"
            name="recipient"
            value="Someone Else"
            checked={formData.recipient === 'Someone Else'}
            onChange={handleChange}
          />{' '}
          Someone Else
        </label>
      </div>

      {/* Private List Checkbox */}
      <label>
        <input
          type="checkbox"
          name="privateList"
          checked={formData.privateList}
          onChange={handleChange}
        />{' '}
        Private List
      </label>

      {/* Save List Button */}
      <button type="submit" style={buttonStyle}>Save List</button>
    </form>
  );
};

    // Inline Styles
    const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9'
    };

    const inputStyle = {
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
    };

    const textAreaStyle = {
    ...inputStyle,
    height: '80px'
    };

    const radioGroupStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '10px'
    };

    const buttonStyle = {
    padding: '10px',
    backgroundColor: '#28E3DE',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
    };

export default EventForm;