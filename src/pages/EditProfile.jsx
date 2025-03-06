import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // for decoding JWT token if needed
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to access URL params
import { AdminStatus } from "../authorise/AdminStatus";

import "./styles/themes/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";
import AvatarSelection from "../components/CreateAvatar";

function EditProfile() {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [child, setChild] = useState("");
  const [age, setAge] = useState("");
  const [admin, setAdmin] = useState();
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  // Get the JWT token from localStorage
  const token = localStorage.getItem("token");

  // Fetch user data on mount
  useEffect(() => {
    console.log("Profile ID: ", id);

    const fetchProfileData = async () => {
      try {
        // Fetch user data based on the id from URL
        const response = await axios.get(
          `http://localhost:5001/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response Data: ", response.data);
        const data = response.data.user;

        if (data) {
          const profile = data;

          setUserName(profile.userName);
          setFirstname(profile.firstname);
          setLastname(profile.lastname);
          setPhonenumber(profile.phonenumber);
          setChild(profile.child ? "Yes" : "No");
          setAge(profile.age);
          setAdmin(profile.admin);
          setUserImage(profile.userImage);
        } else {
          console.error("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or if there's an error
      }
    };

    fetchProfileData();
  }, [id, token]);

  // Handle form submission for updates (PATCH request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If  no avatar selected =Set the current saved avatar as userImage
    setUserImage(selectedAvatar || userImage);

    const profileData = {
      userName: userName,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      age: age,
      admin: admin,
      child: child === "Yes" ? true : false, // Convert 'Yes'/'No' to true/false
      userImage: selectedAvatar || userImage,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5001/api/user/${id}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert("Update failed, please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
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

  // Handle selection change in Form.Select
  const handleSelectChange = (e) => {
    setChild(e.target.value); // Update the option state with the selected value
  };

  // Handle avatar selection from AvatarSelection component
  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };

  // Handle Delete User Profile
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Send a DELETE request to remove the profile
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5001/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setDeleted(true);
        alert("The Profile has been deleted!"); // Set deleted state to true
        setTimeout(() => {
          navigate("/api/user"); // Redirect to profiles page after deletion
        }, 2000); // Wait 2 seconds to show the message before redirecting
      }
    } catch (error) {
      console.error("There was an error deleting the profile!", error);
      alert("Error deleting profile!");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Handle the case where data is still loading
  }

  const isAdmin = AdminStatus();

  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/ppals_logo.png" alt="logo" />
        {deleted ? (
          <div className="alert alert-success">
            This profile has been deleted.
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2>Edit Profile</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <label>Your Current Avatar</label>
              <div dangerouslySetInnerHTML={{ __html: userImage }} />
            </div>
            <div className="avatarList">
              {/* Avatar Selection */}
              <AvatarSelection onAvatarSelect={handleAvatarSelection} />
            </div>
            <form
              className="d-flex flex-column justify-content-center align-items-center"
              onSubmit={handleSubmit}
            >
              <label style={{ marginBottom: "0.5rem" }}>
                Your User Name (this cannot be changed):
              </label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={userName}
                disabled
                style={{ marginBottom: "1rem" }} // Adds space between inputs
              />
              <label style={{ marginBottom: "0.5rem" }}>Reset Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"New Password"}
                minLength="8"
                required={false}
                style={{ marginBottom: "1rem" }}
              />
              <label style={{ marginBottom: "0.5rem" }}>Your First Name:</label>
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder={firstname}
                style={{ marginBottom: "1rem" }}
              />
              <label style={{ marginBottom: "0.5rem" }}>Your Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder={lastname}
                style={{ marginBottom: "1rem" }}
              />
              <label style={{ marginBottom: "0.5rem" }}>
                Your Phone Number:
              </label>
              <input
                type="text"
                name="phonenumber"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder={phonenumber}
                style={{ marginBottom: "1rem" }}
              />
              {isAdmin && (
                <div>
                  <label style={{ marginBottom: "0.5rem" }}>
                    {`Admin user currently set at: ${admin}. Set Admin status: `}
                  </label>
                  <input
                    type="checkbox"
                    label="Admin User"
                    checked={admin}
                    onChange={(e) => setAdmin(e.target.checked)}
                    style={{ marginBottom: "1rem" }}
                  />
                  <br></br>
                  <label
                    style={{ marginBottom: "0.5rem" }}
                  >{`Child user currently set at: ${child}.`}</label>
                  <br></br>
                  <label htmlFor="Child" style={{ marginBottom: "0.5rem" }}>
                    Choose an option:
                  </label>
                  <select
                    id="Child"
                    name="Are you a child?"
                    value={child}
                    onChange={handleSelectChange}
                    style={{ marginBottom: "1rem" }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              )}
              <label style={{ marginBottom: "0.5rem" }}>Your Age:</label>
              <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder={age}
                style={{ marginBottom: "1rem" }}
              />
              <button
                className="btn btn-success"
                variant="primary"
                type="submit"
              >
                Save Changes To Profile.
              </button>
              <Link to="/api/user">
                <button className="btn mt-3 btn-warning">Cancel / Back.</button>
              </Link>
              {isAdmin && (
                <button
                  className="btn mt-3 mb-3 btn-danger"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete Profile.
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
