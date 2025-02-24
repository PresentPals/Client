import api from "../config/api";

// Login User 
const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};
// Logout User
const logoutUser = async (userData) => {
  const response = await api.get("/auth/logout");
  return response.data;
};
// Register new User
const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};
// Set Logged in user with userDetails ID
const setLoggedInUser = (userDetails) => {
  userDetails
    ? localStorage.setItem("loggedInUser", userDetails._id)
    : localStorage.removeItem("loggedInUser");

  userDetails
    ? localStorage.setItem("username", userDetails.username)
    : localStorage.removeItem("username");
};

// Get Logged In User information from local storage
const getLoggedInUser = () => {
  return localStorage.getItem("loggedInUser");
};

export {
  loginUser,
  logoutUser,
  registerUser,
  setLoggedInUser,
  getLoggedInUser,
};