import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // for decoding JWT token if needed
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to access URL params

import "../styling/Profiles.css";
import HamburgerMenu from "../components/HamburgerMenu";
import AvatarSelection from "../components/CreateAvatar";

function EditProfile() {
  const { id } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [child, setChild] = useState("");
  const [age, setAge] = useState("");
  const [admin, setAdmin] = useState(false);
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
          `http://localhost:5000/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        console.log("Response Data: ", response.data);
        const data = response.data.user;

        if (data) {
          const profile = data;

          setUserEmail(profile.userEmail);
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

    const profileData = {
      userEmail: userEmail,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      age: age,
      admin: admin,
      child: child === "Yes" ? true : false, // Convert 'Yes'/'No' to true/false
      userImage: selectedAvatar,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/user/${id}`,
        profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      alert("Error updating profile!");
    }
  };

  // Handle userImage file selection
  const handleUserImageChange = (e) => {
    setUserImage(e.target.files[0]); // Set the selected file as userImage
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
        `http://localhost:5000/api/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setDeleted(true);
        alert("The Profile has been deleted!"); // Set deleted state to true
        setTimeout(() => {
          navigate("/api/user"); // Redirect to profiles page after deletion
        }, 3000); // Wait 3 seconds to show the message before redirecting
      }
    } catch (error) {
      console.error("There was an error deleting the profile!", error);
      alert("Error deleting profile!");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Handle the case where data is still loading
  }

  return (
    <div>
      <HamburgerMenu className="dropdown-menu" />
      <div className="container">
        <img src="ppals_logo.png" />
        {deleted ? (
          <div className="alert alert-success">
            This profile has been deleted.
          </div>
        ) : (
          <>
            <h2>Edit Profile</h2>
            <div>
              <label>Your current avatar</label>
              <div dangerouslySetInnerHTML={{ __html: userImage }} />
            </div>
            <div className="avatarList">
              {/* Avatar Selection */}
              <AvatarSelection onAvatarSelect={handleAvatarSelection} />
            </div>
            <form className="vertical-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder={userEmail}
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"New Password"}
              />
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder={firstname}
              />
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder={lastname}
              />
              <input
                type="number"
                name="phonenumber"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder={phonenumber}
              />
              <label> {`Admin user currently set at: ${admin}.`}</label>
              <input
                type="checkbox"
                label="Admin User"
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <label>{`Child user currently set at: ${child}.`}</label>
              <label htmlFor="Child">Choose an option:</label>
              <select
                id="Child"
                name="Are you a chiild ?"
                value={child}
                onChange={handleSelectChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder={age}
              />
              <button variant="primary" type="submit">
                Save Changes To Profile
              </button>
              <br></br>
              <button variant="danger" type="submit" onClick={handleDelete}>
                Delete Profile
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
