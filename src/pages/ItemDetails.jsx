import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/themes/styles.css";
// import "../public/images/logo";
import HamburgerMenu from "../components/HamburgerMenu"

const Wishlist = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Adidas Originals - Spezial",
      price: "$189.99",
      store: "Hype DC",
      size: "Women US size 10",
      color: "Cobalt and Fushia",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      purchasedBy: "Maddie",
    },
  ]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <div className="bg-gray-900 p-4 rounded-lg">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="text-teal-400 text-4xl mr-2">🎁</span> PRESENTPALS
        </h1>
      </div>
      <h2 className="text-teal-400 text-2xl my-4">Wish List (Name)</h2>
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <img src={item.image} alt={item.name} className="w-48 rounded-lg" />
            <div className="bg-gray-700 p-4 rounded-lg w-full">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-lg">{item.price}</p>
              <p className="text-sm text-gray-400">{item.store}</p>
              <p className="text-sm">{item.size}</p>
              <p className="text-sm">{item.color}</p>
            </div>
          </div>
        ))}
        <p className="bg-white text-black p-2 rounded text-center">Item purchased by Maddie</p>
      </div>
      <button className="bg-teal-400 text-black px-6 py-2 rounded mt-4">Add Item</button>
    </div>
  );
};

export default Wishlist;
