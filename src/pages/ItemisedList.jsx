import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import HamburgerMenu from "../components/HamburgerMenu";
import { ChildStatus } from "../authorise/ChildStatus";
import { AdminStatus } from "../authorise/AdminStatus";
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
  const isAdmin = AdminStatus();
  const { child } = ChildStatus();

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
              <div className="d-flex justify-content-center flex-wrap">
                <ul className="" key={index}>
                  {gift.giftImage} {gift.giftName} {gift.giftDescription}
                  {!child || isAdmin ? (
                    <Link to={`${gift._id}`}>
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
                      {gift.purchased &&
                      <div class="" style={{color: "black", width: "300px", textAlign: "center", background: "yellow", borderRadius: "20px", padding: "5px"}}>
                        Username:{gift.purchasedBy}, has marked this as purchased.
                        </div>
                        }
                    </Link>
                  ) : null}
                </ul>
              </div>
            ))
          ) : (
            <div>
              <label>
                There are no current gift items. Select Add Item To List:
              </label>
            </div>
          )}
          {child ||
            isAdmin ? (
              <div>
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
              </div>
            ) : null}
        </div>
    </div>
  );
}

export default WishList;
