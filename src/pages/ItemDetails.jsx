import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useParams, useNavigate, Link } from "react-router-dom";

import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";
import { UserLogged } from "../authorise/LoggedUser";
import { AdminStatus } from "../authorise/AdminStatus";
// this function will get and display all the details of an individual gift when selected:
const ItemDetails = () => {
  // set the state hooks
  const { id, giftId } = useParams();
  const [item, setItem] = useState([]);
  const [purchased, setPurchased] = useState("Yes");
  const [purchasedBy, setPurchasedBy] = useState("");
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // this function gets the item from the giiftlist id & gift id using url params:
    const fetchItem = async () => {
      try {
        console.log("giftId:", giftId)
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://server-5d6r.onrender.com/api/giftlist/${id}/${giftId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // set the Item state with the gift data from the backend
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
  // this function handles the purchase item button
  const handlePurchaseItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // apply the user name logged in to a variable from the UserLogged function
      const userLoggedIn = UserLogged();
      // save the choice & logged in username to an object
      const data = {
        purchased: purchased === "Yes" ? true : false,
        purchasedBy: userLoggedIn,
      };
      // console.log("data:", data)
      // send the data object to the backend route 
      const response = await axios.patch(
        `https://server-5d6r.onrender.com/api/giftlist/${id}/${giftId}`,
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
        alert("Trying to purchase failed, please try again or you may need to log back into the application.");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };

  // Handle Delete of an Item
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Send a DELETE request to remove the item
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://server-5d6r.onrender.com/api/giftlist/${id}/${giftId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setDeleted(true);
        alert("This gift item has been deleted!"); 
        setTimeout(() => {
          navigate(`/api/giftlist/${id}`); // Redirect to the wish list page after deletion
        }, 1000); // Wait 1 second before redirecting
      } else {
        alert("Trying to delete item  failed, please try again or you may need to log back into the application.");
      }
    } catch (error) {
      console.error("There was an error deleting the profile!", error);
      alert("Error deleting Item!");
    }
  };

  //Handle selection change in the purchasedBy dropdown
  const handleSelectChange = (e) => {
    setPurchased(e.target.value);
  };
  // get the admin status of the user logged in from the AdminStatus authorise component.
  const isAdmin = AdminStatus();

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
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              <img
                src={`https://server-5d6r.onrender.com${item.giftImage}`}
                alt={"No Image has been added."}
                style={{
                  width: "280px",
                  height: "180px",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
              <div className="bg-gray-700 p-4 rounded-lg w-full">
                <label className=" flex items-center">Description of gift item requirements:</label>
                <p className="text-lg" style={{
                      listStyle: "none",
                      width: "300px", 
                      wordWrap: "break-word", 
                      overflowWrap: "break-word",
                    }}>{item.giftDescription}</p>
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
          {isAdmin && (
                <button
                  className="btn mt-3 mb-3 btn-danger"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete This Gift Item.
                </button>
              )}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
      <Link to={`/api/giftlist/${id}`}>
      <button className="btn mt-3 btn-warning" >Cancel / Back.</button>
      </Link>
      </div>
      </div>
    </div>
  );
};

export default ItemDetails;
