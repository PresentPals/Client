import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import HamburgerMenu from "../components/HamburgerMenu";
import { AdminStatus } from "../authorise/AdminStatus";
import { ChildStatus } from "../authorise/ChildStatus";

import "./styles/styles.css";
// this function will display all the user documents in the database
function DisplayProfiles() {
  // set the profiles hook
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // as soon as user pages loads, GET the user details from db
    const fetchProfiles = async () => {
      try {
        //get the security token
        const token = localStorage.getItem("token");
        
        if (!token) {
          alert("No security token found, so the user is not authenticated. Please log back into the application. ");
          return;
        }
        //get user data from the user route
        const response = await axios.get("http://localhost:5001/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("Response data:", response.data);
        // users data response from db & sets the profiles state:
        if (Array.isArray(response.data.users)) {
          setProfiles(response.data.users);
        } else {
          setProfiles([]);
        }
        if (response.status === 500) {
          alert("There is a error / no connection with the server.  Please contact your admin.")
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);
  // get the admin status & child status from mthe authorise components
  const isAdmin = AdminStatus();
  const { child, childId } = ChildStatus();
  // find the children from the user data
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
