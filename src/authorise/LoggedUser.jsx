import { jwtDecode } from "jwt-decode";
// this function decodes from the token of the userName currently logged in.
export const UserLogged = () => {
    const token = localStorage.getItem("token"); 
    if (!token) return { userLoggedIn: null };

    try {
        const decoded = jwtDecode(token);
        return decoded.userLoggedIn || null; // This ensures it's a value
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};