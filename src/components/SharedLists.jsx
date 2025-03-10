import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplaySharedLists = ({ userName }) => {
  const [sharedLists, setSharedLists] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, so the user is not authenticated.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5001/api/giftlist/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const userSharedEvents = events.filter(
    (event) => event.userShared?.some(shared => shared.sharedUserName === userName)
  );
  console.log("events",events)
  console.log("username",userName);
  console.log("sharedEvents",userSharedEvents);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h4>Your Shared Wish Lists are <p>(click to open that wish list details):</p></h4>
      {userSharedEvents.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 2 }}>
            {userSharedEvents.map((event, index) => (
            <li key={index} >
              <Link to={`/api/giftlist/${event._id}`}>  
                <button style={{ padding: "10px", marginBottom: "5px", borderRadius:"5px", background: "#28E3DE" }}>{event.giftListTitle}</button>  
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <label>
        <p>No shared wish lists currently.</p>
        <p> Please contact your admin family / friend member.</p>
        </label>
      )}
    </div>
  );
};

export default DisplaySharedLists;
