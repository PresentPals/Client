import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to access the id in URL params
import { AdminStatus } from "../authorise/AdminStatus";

import "./styles/styles.css";
import HamburgerMenu from "../components/HamburgerMenu";
import AvatarSelection from "../components/CreateAvatar";
import DisplaySharedLists from "../components/SharedLists";

function EditProfile() {
  // set the state hooks for added user inputs
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

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Fetch user data and mount to the page dom
  useEffect(() => {

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

        // console.log("Response Data: ", response.data);
        //response data from backend
        const data = response.data.user;

        if (data) {
          // set the data to a variable called profile
          const profile = data;
          // set all the user states with data from profile in db
          setUserName(profile.userName);
          setFirstname(profile.firstname);
          setLastname(profile.lastname);
          setPhonenumber(profile.phonenumber);
          setChild(profile.child ? "Yes" : "No");//If child is true, set as "Yes"
          setAge(profile.age);
          setAdmin(profile.admin);
          setUserImage(profile.userImage);
        } else {
          alert("Failed to fetch profile data. There could an issue with the server, contact your admin.");
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or if there's an error
      }
    };

    fetchProfileData();
  }, [id, token]);

  // Handle the submit button for updating profiles
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If  no avatar selected =Set the current saved avatar as userImage
    setUserImage(selectedAvatar || userImage);
    // set all data fields and save to a object:
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
      // get the stored local token & send the data object to the backend route based on id fom the params
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
      const data = response.data;
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setTimeout(() => {
          navigate("/api/user"); // Redirect to profiles page after saved
        }, 1000);
      } else if (response.status === 404 && data.message){
        alert(data.message)
      } else if (response.status === 401 && data.message){
        alert(data.message)
      } else if (response.status === 403 && data.message){
        alert(data.message)
      } else if (response.status === 500){
        alert("There is a error / no connection with the server.  Please contact your admin.")
      } else {
        alert("Updating profile failed, please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };

  // Handle selection change in the child selection dropdown
  const handleSelectChange = (e) => {
    setChild(e.target.value); // Update the child state with the selected value
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
      const data = response.data;
      if (response.status === 200) {
        setDeleted(true);  // Set deleted state to true
        alert("The Profile has been deleted!");
        setTimeout(() => {
          navigate("/api/user"); // Redirect to profiles page after deletion
        }, 2000); // Wait 2 seconds to show the message before redirecting
      } else if (response.status === 404 && data.message){
        alert(data.message)
      } else if (response.status === 401 && data.message){
        alert(data.message)
      } else if (response.status === 403 && data.message){
        alert(data.message)
      } else if (response.status === 500){
        alert("There is a error / no connection with the server.  Please contact your admin.")
      } else {
        alert("Deleting profile failed, please try again.");
      }
    } catch (error) {
      console.error("There was an error deleting the profile!", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Handle the case where data is still loading
  }
  // set the user logged in admin status from the AdminStatus component
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
            {child?.toString() === "No" &&
            <DisplaySharedLists userName={userName} />
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
