import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import HamburgerMenu from "../components/HamburgerMenu";
import { AdminStatus } from "../authorise/AdminStatus";
import { ChildStatus } from "../authorise/ChildStatus";

import "./styles/themes/styles.css";

function DisplayProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          console.error("No token found, so the user is not authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:5001/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const isAdmin = AdminStatus();
  const { child, childId } = ChildStatus();
  const displayChild = profiles.find((user) => user._id === childId);

  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/ppals_logo.png" alt="logo" />
        <h2>PresentPals Profiles</h2>
      </div>
      {child && displayChild ? (
        <div>
          <Link to={`${displayChild._id}`}>
            <button className="btn"
                    style={{
                      border: "4px solid #28E3DE",
                      borderRadius: "20px",
                      backgroundColor: "#28E3DE",
                    }}>
              <div
                dangerouslySetInnerHTML={{ __html: displayChild.userImage }}
              />
              {displayChild.firstname} {displayChild.lastname}
            </button>
          </Link>
        </div>
      ) : (
        <div className="d-flex justify-content-center flex-wrap">
          {profiles.map((profile) => (
              <ul className="" key={profile._id}>
                <Link to={`${profile._id}`}>
                  <button
                    className="btn"
                    style={{
                      border: "4px solid #28E3DE",
                      borderRadius: "20px",
                      backgroundColor: "#28E3DE",
                    }}
                  >Edit
                    <div
                      dangerouslySetInnerHTML={{ __html: profile.userImage }}
                    />
                    {profile.firstname} {profile.lastname}
                  </button>
                </Link>
              </ul>
          ))}
          {isAdmin && (
            <ul className="mt-4">
              <Link to="add">
                <button className="btn btn-success" variant="primary">
                  Add New Profile.
                </button>
              </Link>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayProfiles;
