import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";
import { UserLogged } from "../authorise/LoggedUser";

const ItemDetails = () => {
  const { id, giftId } = useParams();
  const [item, setItem] = useState([]);
  const [purchased, setPurchased] = useState("Yes");
  const [purchasedBy, setPurchasedBy] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {

        console.log("giftId:", giftId)
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5001/api/giftlist/${id}/${giftId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setItem(response.data.giftItem || []);
        
      } catch (error) {
        console.error("Error fetching gift item", error);
        if (
          error.response &&
          error.response.status === 404 &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert("Error updating profile!");
        }
      }
    };

    fetchItem();
  }, [id]);

  const handlePurchaseItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userLoggedIn = UserLogged();

      const data = {
        purchased: purchased === "Yes" ? true : false,
        purchasedBy: userLoggedIn,
      };
      console.log("data:", data)

      const response = await axios.patch(
        `http://localhost:5001/api/giftlist/${id}/${giftId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setPurchased(response.data.updatedPurchased || []);
        alert("Item marked as purchased successfully!");
        window.location.reload(); 
      } else {
        alert("Trying to purchase failed, please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };

  //Handle selection change in select
  const handleSelectChange = (e) => {
    setPurchased(e.target.value);
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
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-3xl font-bold flex items-center">
            View Gift Item:
          </h1>

          <h2 className="text-teal-400 text-2xl my-4 flex items-center">{item.giftName}</h2>
          <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-6 mb-6">
              <img
                src={item.giftImage || "No Image has been added."}
                alt={""}
                className="w-48 rounded-lg"
              />
              <div className="bg-gray-700 p-4 rounded-lg w-full">
                <label className=" flex items-center">Description of gift item requirements:</label>
                <p className="text-lg">{item.giftDescription}</p>
                <label>Available for purchase at this website address:</label>
                <p className="text-lg">{item.giftWebAddress}</p>
              </div>
            </div>
            {item.purchased ? (
              <label style={{color: "yellow"}}>{item.purchasedBy} has marked this as purchased.</label>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <label style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                  Would you like to purchase this item ?
                </label>
                <label htmlFor="purchased" style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                  Confirm this option:
                </label>
                <select
                  id="purchased"
                  value={purchased}
                  onChange={handleSelectChange}
                  style={{ marginBottom: "1rem", width: "220px" }}
                >
                  <option value="Yes">Yes</option>
                </select>
                {/* Purchase Button */}
                <button
                  style={{ background: "#28e3da", fontSize: "20px" }}
                  onClick={handlePurchaseItem}
                >
                  Mark You As Purchasing This Item.
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
