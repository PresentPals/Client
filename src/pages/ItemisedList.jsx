import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/themes/styles.css";
// import "../public/images/logo";
import HamburgerMenu from "../components/HamburgerMenu"

const ItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [purchased, setPurchased] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState([]); // Stores the list of items

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    if (!itemName || !image) {
      alert('Please enter an item name and upload an image.');
      return;
    }

    // Create a new item object
    const newItem = {
      id: Date.now(), // Unique ID for each item
      name: itemName,
      purchased: purchased,
      image: preview,
    };

    // Add new item to the list
    setItems([...items, newItem]);

    // Clear the form
    setItemName('');
    setPurchased(false);
    setImage(null);
    setPreview(null);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Add an Item</h2>

      {/* Item Name Input */}
      <div>
        <label>Item Name:</label>
        <input 
          type="text" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          required 
        />
      </div>

      {/* Checkbox for Purchased */}
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={purchased} 
            onChange={(e) => setPurchased(e.target.checked)} 
          />
          Purchased
        </label>
      </div>

      {/* Image Upload */}
      <div>
        <label>Upload Image:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          required 
        />
      </div>

      {/* Image Preview */}
      {preview && <img src={preview} alt="Preview" style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }} />}

      <br /><br />
      
      {/* Add Item Button */}
      <button onClick={handleAddItem}>Add Item</button>

      <h2>Item List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <strong>{item.name}</strong> {item.purchased ? "(Purchased)" : "(Not Purchased)"}
            <br />
            <img src={item.image} alt={item.name} style={{ width: '100px', marginTop: '5px', borderRadius: '8px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemForm;