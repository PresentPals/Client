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
  const [users, setUsers] = useState([]);
  const [sharedUserName, setSharedUserName] = useState("");

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

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5001/api/user/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);
        const fetchUsers = Array.isArray(response.data.users)
          ? response.data.users
          : [];
        setUsers(fetchUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchedData = async () => {
      await fetchGifts();
      await fetchUsers();
    };

    fetchedData();
  }, [id]);

  const handleAddSharedUser = async (e) => {
    e.preventDefault();

    if (sharedUserName === "") {
      alert("No Username has been selected to share this wish list !!.");
      return;
    }

    const findSelectNames = users.find(
      (user) => user.userName === sharedUserName
    );

    const data = {
      sharedUserName,
      sharedFirstName: findSelectNames.firstname,
      sharedLastName: findSelectNames.lastname,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5001/api/giftlist/${id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Shared user added successfully to this list!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the shared user!", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Error updating shared user!");
      }
    }
    // Clear the state:
    setSharedUserName("");
  };

  const parentUsers = users.filter((user) => !user.child); // Users where child = false

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
        {child || isAdmin ? (
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
      {!child || isAdmin ? (
        <form
          className="d-flex flex-column justify-content-center align-items-center"
          onSubmit={handleAddSharedUser}
        >
          {/* Shared Users of this List */}
          <label>Share a adult to this wish list:</label>
          <div style={childGroupStyle}>
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
            <Link to="/api/giftlist/">
              <button className="btn mt-3 btn-warning">Cancel / Back.</button>
            </Link>
          </div>
        </form>
      ) : null}
    </div>
  );
}

const childGroupStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "10px",
};

export default WishList;
