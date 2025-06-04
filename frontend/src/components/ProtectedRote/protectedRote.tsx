import { ReactNode } from 'react'; // Imports the ReactNode type from React, used to define a generic type for any component.
import { Navigate } from 'react-router-dom'; // Imports the <Navigate> component, used to redirect the user to another page.

// Defines the <ProtectedRoute> component, which is used to protect routes
// by preventing the user from accessing them if they are not logged in.
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    // children: A property of type ReactNode, which should be
    // the component rendered if the user is logged in.

    // token: Retrieves the token that was stored in localStorage at login time.
    // If no token exists in localStorage, the variable will be set to null.
    const token = localStorage.getItem('authToken');

    // Checks whether the token exists (i.e., is not null).
    // If it does not exist, uses <Navigate> to redirect the user to the login page.
    if (!token) {
        return <Navigate to='/login' />; // ✅ Translated route
    }

    // If the token exists, renders the children property.
    return children;
};
