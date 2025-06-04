// Imports the jwtDecode function used to decode JWT tokens.
import { jwtDecode } from "jwt-decode";

// Function that checks if the authentication token has expired.
export const VerifyToken = () => {

    // Retrieves the authentication token stored in localStorage.
    const token = localStorage.getItem('authToken');

    // If a token exists, continue to decode it and verify if it is valid.
    // Otherwise, do nothing.
    if (token) {
        // Decodes the token to extract its information, especially the "exp" property which indicates the expiration time.
        // The type { exp?: number } defines that the "exp" property may exist and be a number.
        const decodedToken: { exp?: number } = jwtDecode(token);

        // If the decoded token contains the "exp" property, which is the expiration time:
        if (decodedToken.exp) {
            // Gets the current time in seconds.
            // Date.now() returns the current time in milliseconds, so it is divided by 1000 to convert to seconds.
            const currentTime = Date.now() / 1000;

            // If the token's expiration time is less than the current time,
            // this means the token has already expired.
            if (decodedToken.exp < currentTime) {
                // Removes the expired token from localStorage.
                localStorage.removeItem('authToken');
                // Reloads the page; since the token was removed, the user will be redirected to the '/login' route.
                window.location.reload();
            }
        }
    }
};
