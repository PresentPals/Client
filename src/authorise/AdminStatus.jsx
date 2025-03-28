import { jwtDecode } from "jwt-decode";
// this function decodes the admin status from the token of the current user logged in
export const AdminStatus = () => {
    const token = localStorage.getItem("token"); 
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.admin || false; // This ensures it's a boolean value
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
};

