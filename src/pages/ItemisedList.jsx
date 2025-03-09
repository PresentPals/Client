import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import HamburgerMenu from "../components/HamburgerMenu";
import "./styles/styles.css";

function WishList() {
  const { id } = useParams();
  const [childList, setChildList] = useState([]);
  const [childItems, setChildItems] = useState([]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          console.error("No token found, so the user is not authenticated.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5001/api/giftlist/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response data:", response.data);

        if (response.data.giftlist) {
          setChildList(response.data.giftlist); 
          setChildItems(response.data.giftlist.childGiftList || []); 
        } else {
          setChildList(null);
          setChildItems([]);
        }
        setChildItems((items) =>
          items.filter((childItems) => childItems.giftName !== "")
        );
      } catch (error) {
        console.error("Error fetching the giftlist:", error);
      }
    };
    fetchGifts();
  }, []);


  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/ppals_logo.png" alt="logo" />
        <h2>{childList.giftListTitle}</h2>
        <h4>Wish List of: {childList.childUser}</h4>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {Array.isArray(childItems) && childItems.length > 0 ? (
          childItems.map((gift, index) => (
            <ul className="" key={index}>
              {gift.giftImage} {gift.giftName} {gift.giftDescription}
              <Link to={"item"}>
                <button
                  className="btn"
                  style={{
                    border: "4px solid #28E3DE",
                    borderRadius: "20px",
                    backgroundColor: "#28E3DE",
                  }}
                >
                  View Gift Details
                </button>
              </Link>
              <br></br>
              <Link to={"add"}>
                <button
                  className="btn"
                  style={{
                    border: "4px solid #28E3DE",
                    borderRadius: "20px",
                    backgroundColor: "#28E3DE",
                  }}
                >
                  Add Item To List
                </button>
              </Link>
            </ul>
          ))
        ) : (
          <div>
            <label>
              There are no current gift items. Select Add Item To List:
            </label>
            <Link to={"add"}>
              <button
                className="btn"
                style={{
                  border: "4px solid #28E3DE",
                  borderRadius: "20px",
                  backgroundColor: "#28E3DE",
                }}
              >
                Add Item To List
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
