import React, { useEffect, useState } from "react";
import axios from "axios";

import HamburgerMenu from "../components/HamburgerMenu";
import "../styling/Profiles.css";

function DisplayProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/", {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        console.log("Response data:", response.data);
        if (Array.isArray(response.data.users)) {
          setProfiles(response.data.users);
        } else {
          setProfiles([]); 
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="container">
        <img src="ppals_logo.png" />
        <h2>Display Profiles</h2>
      </div>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id}>
            {profile.firstname} {profile.lastname}
          </li>
        ))}
      </ul>
      <a href="add">
        <button variant="primary">Add New Profile</button>
      </a>
    </div>
  );
};

export default DisplayProfiles;
