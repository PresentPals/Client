import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";

const AddGift = () => {
  const { id } = useParams();
  const [giftName, setGiftName] = useState("");
  const [giftDescription, setGiftDescription] = useState("");
  const [giftWebAddress, setGiftWebAddress] = useState("");
  const [file, setFile] = useState(null);
  // const [purchased, setPurchased] = useState(false);
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState([]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Show image preview
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      if (!giftName) {
        alert("Please enter an item name as this is required.");
        return;
      }
      // Create a new item object
      const formData = new FormData();
      formData.append("image", file);
      formData.append("giftName", giftName);
      formData.append("giftDescription", giftDescription);
      formData.append("giftWebAddress", giftWebAddress);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5001/api/giftlist/${id}/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Gift added successfully!");
      } else {
        alert("Gift add failed, please try again.");
      }
    } catch (error) {
      console.error("There was an error adding the gift!", error);
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Error adding gift!");
      }
    }

    // Clear the form
    setGiftName("");
    setGiftDescription("");
    setFile(null);
    setGiftWebAddress("");
    // setPurchased(false);
    setPreview(null);
  };

  return (
    <div>
      <HamburgerMenu />
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80vh",
        }}
      >
        <h2>Add An Item To The Gift List</h2>
        {/* Item Name Input */}
        <div style={{ position: "relative" }}>
          <label>Item Name:</label>
          <input
            className="form-control form-control-lg"
            type="text"
            value={giftName}
            onChange={(e) => setGiftName(e.target.value)}
            required
          />
        </div>
        {/* Item Description Input */}
        <label>Item Description:</label>
        <textarea
          className="form-control form-control-lg"
          style={{
            width: "100%",
            height: "100px",
            fontSize: "16px",
            padding: "10px",
          }}
          value={giftDescription}
          onChange={(e) => setGiftDescription(e.target.value)}
          required
          placeholder="Enter a item description. Be specifc with colour, sizing, estimated price & the store to purchase from (if no web address can be found)."
        />
        {/* Item WebAddress Input */}
        <div>
          <label>Item Web Address:</label>
          <input
            className="form-control form-control-lg"
            type="text"
            value={giftWebAddress}
            onChange={(e) => setGiftWebAddress(e.target.value)}
          />
        </div>
        {/* Image Upload */}
        <div>
          <label>Upload Item Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}
        {/* Add Item Button */}
        <button
          style={{ background: "#28e3da", fontSize: "30px" }}
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Link to={`/api/giftlist/${id}`}>
          <button className="btn mt-3 btn-warning">Cancel / Back.</button>
        </Link>
      </div>
    </div>
  );
};

export default AddGift;
