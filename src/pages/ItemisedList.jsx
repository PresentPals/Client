import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import HamburgerMenu from "../components/HamburgerMenu";
import { ChildStatus } from "../authorise/ChildStatus";
import { AdminStatus } from "../authorise/AdminStatus";
import "./styles/styles.css";
// this function will get and display all the nested gift objects assigned to a certain gift list:
function WishList() {
  const { id } = useParams();
  const [childList, setChildList] = useState([]);
  const [childItems, setChildItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [sharedUserName, setSharedUserName] = useState("");
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      // get all the gifts from the certain gift list id.
    const fetchGifts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found, so the user is not authenticated. Please log back into the aplication.");
          return;
        }

        const response = await axios.get(
          `https://server-9w3v.onrender.com/api/giftlist/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Response data:", response.data);
        // response data from backend and assign the gift list object to the child list state, assign the individual nested gift objects to the child items state.
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
        if (response.status === 500) {
          alert("There is a error / no connection with the server.  Please contact your admin.")
        }

      } catch (error) {
        console.error("Error fetching the giftlist:", error);
      }
    };
    // this function will get all user data from the db
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        // get user data from the user route
        const response = await axios.get("https://server-9w3v.onrender.com/api/user/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log("API Response:", response.data);
        // user data from the backend assigned to a variable
        const fetchUsers = Array.isArray(response.data.users)
          ? response.data.users
          : [];
          // users state set with the fetched data
        setUsers(fetchUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    // this async function just to call await on both the above functions
    const fetchedData = async () => {
      await fetchGifts();
      await fetchUsers();
    };

    fetchedData();
  }, [id]);

  // handle the shared user selection and add button
  const handleAddSharedUser = async (e) => {
    e.preventDefault();
    // shared user cannot be blank if trying to add
    if (sharedUserName === "") {
      alert("No Username has been selected to share this wish list !!.");
      return;
    }
    // find the user details where the username selected to be shared equals the username from user data gotten from db.
    const findSelectNames = users.find(
      (user) => user.userName === sharedUserName
    );
    // add the above shared user selected data to a object
    const data = {
      sharedUserName,
      sharedFirstName: findSelectNames.firstname,
      sharedLastName: findSelectNames.lastname,
    };

    try {
      // get the token and send the shared user data to the backend based on the gift list id.
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://server-9w3v.onrender.com/api/giftlist/${id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = response.data
      if (response.status === 201) {
        alert("Shared user added successfully to this list!");
      } else if (response.status === 401 && resData && resData.message){
        alert(resData.message)
      } else if (response.status === 403 && resData && resData.message){
        alert(resData.message)
      } else if (response.status === 500) {
        alert("There is a error / no connection with the server.  Please contact your admin.")
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the shared user!", error);
    }
    // Clear the state:
    setSharedUserName("");
  };

  // Handle Delete Wish List
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Send a DELETE request to remove the gift list
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://server-9w3v.onrender.com/api/giftlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setDeleted(true);
        alert("That wish list has been deleted!"); // Set deleted state to true
        setTimeout(() => {
          navigate("/api/giftlist/"); // Redirect to events page after deletion
        }, 1000); // Wait 1 second to show the message before redirecting
      } else if (response.status === 500) {
        alert("There is a error / no connection with the server.  Please contact your admin.")
      }
    } catch (error) {
      console.error("There was an error deleting this giftlist!", error);
      alert("Error deleting giftlist!");
    }
  };
  // find users where child = false
  const parentUsers = users.filter((user) => !user.child); 
  // get the admin & child statuses from the components
  const isAdmin = AdminStatus();
  const { child } = ChildStatus();

  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/ppals_logo.png" alt="logo" />
        <h2>{childList.giftListTitle}</h2>
        <h4>Wish List of: {childList.childUser}</h4>
        <h6>Wish List Description: {childList.listDescription}</h6>
      </div>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {Array.isArray(childItems) && childItems.length > 0 ? (
          childItems.map((gift, index) => (
            <div>
              <ul
                className="text-center"
                key={index}
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div style={{ border: "3px solid white", padding: "20px" }}>
                  <li style={{ listStyle: "none" }}>
                    {gift.giftImage && (
                      <img
                        src={`https://server-9w3v.onrender.com${gift.giftImage}`}
                        alt={gift.giftName}
                        style={{
                          width: "280px",
                          height: "180px",
                          objectFit: "contain",
                          borderRadius: "10px",
                        }}
                      />
                    )}
                  </li>
                  <li style={{ listStyle: "none" }}>{gift.giftName}</li>
                  <li
                    style={{
                      listStyle: "none",
                      width: "300px", 
                      wordWrap: "break-word", 
                      overflowWrap: "break-word",
                    }}
                  >
                    {gift.giftDescription}
                  </li>

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
                      {gift.purchased && (
                        <div
                          className=""
                          style={{
                            color: "black",
                            width: "300px",
                            textAlign: "center",
                            background: "yellow",
                            borderRadius: "20px",
                            padding: "5px",
                          }}
                        >
                          Username:{gift.purchasedBy}, has marked this as
                          purchased.
                        </div>
                      )}
                    </Link>
                  ) : null}
                </div>
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
        </div>

        {child || isAdmin ? (
          <div className="d-flex flex-column justify-content-center align-items-center mb-3">
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
      
      {!child || isAdmin ? (
        <form
          className="d-flex flex-column justify-content-center align-items-center"
          onSubmit={handleAddSharedUser}
        >
          {/* Shared Users of this List */}
          <label>Share a adult to this wish list:</label>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={childGroupStyle}
          >
            <div>
              <select
                name="sharedUser"
                value={sharedUserName}
                onChange={(e) => setSharedUserName(e.target.value)}
              >
                <option value="">-- Select Adult --</option>
                {parentUsers.length > 0 ? (
                  parentUsers.map((user, index) => (
                    <option key={index} value={user.userName}>
                      {user.userName} : {user.firstname} , {user.lastname}
                    </option>
                  ))
                ) : (
                  <option disabled>No adults available</option>
                )}
              </select>
              <button
                className="btn btn-success"
                variant="primary"
                type="submit"
              >
                Save Shared Adult.
              </button>
            </div>
            {isAdmin && (
              <button
                className="btn mt-3 mb-2 btn-danger"
                type="submit"
                onClick={handleDelete}
              >
                Delete This Wish List.
              </button>
            )}
          </div>
        </form>
      ) : null}
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Link to="/api/giftlist/">
          <button className="btn mt-3 btn-warning">Cancel / Back.</button>
        </Link>
      </div>
    </div>
  );
}

const childGroupStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "10px",
};

export default WishList;
