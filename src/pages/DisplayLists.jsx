import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import HamburgerMenu from "../components/HamburgerMenu";
import { AdminStatus } from "../authorise/AdminStatus";
import { ChildStatus } from "../authorise/ChildStatus";
import { UserLogged } from "../authorise/LoggedUser";

import "./styles/styles.css";
// this function will display all the giftlist event documents in the db
function DisplayEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No security token found, so the user is not authenticated. Please log back into the application.");
                return;
            }
    
            const response = await axios.get("https://server-9w3v.onrender.com/api/giftlist/", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
    
            // console.log("Response data:", response.data);
            if (Array.isArray(response.data.events)) {
                setEvents(response.data.events);
            } else {
                setEvents([]);
            }
            if (response.status === 500) {
                alert("There is a error / no connection with the server.  Please contact your admin.")
              }
            } catch (error) {
            console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);
    // getting the admin, child and username statuses from the user logged in token
    const isAdmin = AdminStatus();
    const { child }  = ChildStatus();
    const UserLoggedIn = UserLogged();
    // find all events where the username logged in matches the childUser assigned to a giftlist event.
    const displayChildEvent = events.find((event) => event.childUser === UserLoggedIn);

    return (
        <div>
        <HamburgerMenu className="dropdown-menu" />
        <div className="d-flex flex-column justify-content-center align-items-center">
            <img src="/ppals_logo.png" alt="logo" />
            <h2>PresentPals Gift List Events</h2>
        </div>
        {child && displayChildEvent ? (
            <div>
            <Link to={`${displayChildEvent._id}`}>
                <button className="btn"
                        style={{
                        border: "4px solid #28E3DE",
                        borderRadius: "20px",
                        backgroundColor: "#28E3DE",
                        }}>
                {displayChildEvent.giftListTitle}
                </button>
            </Link>
            </div>
        ) : (
            <div className="d-flex justify-content-center flex-wrap">
            {events.map((event) => (
                <ul className="" key={event._id}>
                    <Link to={`${event._id}`}>
                    <button
                        className="btn"
                        style={{
                        border: "4px solid #28E3DE",
                        borderRadius: "20px",
                        backgroundColor: "#28E3DE",
                        }}
                    >Select To View: {event.giftListTitle}.
                    The Date Of This Event: {new Date(event.dateEvent).toLocaleDateString()}
                    </button>
                    </Link>
                </ul>
                ))}
            </div>
            )}
        </div>
    );
}

export default DisplayEvents;