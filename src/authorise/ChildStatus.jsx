import { jwtDecode } from "jwt-decode";

export const ChildStatus = () => {
    const token = localStorage.getItem("token"); 
    if (!token) return { child: false, childId: null };

    try {
        const decoded = jwtDecode(token);
        // Return an object containing both `child` and `childId`
        return {
            child: decoded.child || false, // Default to false if `child` is not in the token
            childId: decoded.childId || null // Default to null if `childId` is not in the token
        };
    } catch (error) {
        console.error("Invalid token:", error);
        return { childId: false, childId: null }; // Return default values in case of an error
    }
};