## Client2_Services_Authentication

### auth_Services

This code defines a set of functions to hanle the user authentication and to manage the logged in user's state in the local storage. The functions interact with the API under the config/api.js for user login, logout and register. Each code line is broken down below

    import api from "../config/api";

This code imports the api object from the local file config/api.js which is an axios instance that has pre-configured settings for making the API requests.

#### Login User

    // Login User 
    const loginUser = async (userData) => {
      const response = await api.post("/auth/login", userData);
      return response.data;
    };

This block of code is for the Login User Function, its purpose is the send a POST request to the auth/login endpoint of the API passing the userData like email/username and password to the auth. It is an asynchronous function that <b>awaits</b> for the response back from the API. This function returns the data from the response, which contains information like a token and user data to manage the session.

#### Logout User

    // Logout User
    const logoutUser = async (userData) => {
      const response = await api.get("/auth/logout");
      return response.data;
    };

This block of code is for the Logout User Function, it's purpose is to send a GET request to the auth/logout endpoint, which will end the user's session. It is also an asynchronous function that <b>awaits</b> for the API response and returns the response data.

#### Register New User

    // Register new User
    const registerUser = async (userData) => {
      const response = await api.post("/auth/register", userData);
      return response.data;
    };

This block of code is for the Register New User function, it's purpose is the send a POST request to the auth/register endpoint to create a new user with the provided userData containing email, username, password. It is an asychronous function which <b>awaits</b> the API response and returns the responses data.

#### Set Logged In User In Local Storage

    // Set Logged in user with userDetails ID
    const setLoggedInUser = (userDetails) => {
      userDetails
        ? localStorage.setItem("loggedInUser", userDetails._id)
        : localStorage.removeItem("loggedInUser");

      userDetails
        ? localStorage.setItem("username", userDetails.username)
        : localStorage.removeItem("username");
    };

This block of code sets the Logged in User, the purpose of this function is to store the userDetails like user's ID and username in the local storage. If the userDetails are provided the user is logged in, the function stores the user's _id and username inside the local storage. If the userDetail are null then the user logs out and ir removes these stored items from the local storage.

#### Get Logged In User from Local Storage

    // Get Logged In User information from local storage
    const getLoggedInUser = () => {
       return localStorage.getItem("loggedInUser");
    };

This block of code is to GET the user from the local storage, its purpose is to retrieve the logged in user's ID from local storage and return the value of the loggedInUser key stored in the localStorage or null if they don't exist.

#### Exporting Functions

    export {
      loginUser,
      logoutUser,
      registerUser,
      setLoggedInUser,
      getLoggedInUser,
    };

This block of code's purpose is to export the functions so that they can be imported and used in other parts of the application.

The code provides untility functions for handling user authentication and state management, including login, logout, registration, and storing and retrieving the logged in user's info in local storage. The setLoggedInUser function is crucial for managing the logged in user's state in the client side browser whicle the other functions interact with the API to perform operations like logging in or registering users.

### Gift List Services