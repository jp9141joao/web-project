// Import necessary components from react-router-dom to manage routing in the application.
// Navigate: Allows automatic redirection to another route.
// Route: Defines an individual route.
// BrowserRouter (renamed as Router): Container that enables URL-based routing.
// Routes: Groups and manages the defined routes.
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Import the global styles file.
import './index.css'

// Import the application pages.
// Home: Main page of the application.
// Login: Login page.
// Register: User registration page.
// Dashboard: Dashboard page (accessible only to authenticated users).
import Home from "./pages/home";
import Login from "./pages/loginPage";
import Register from "./pages/register";
import Dashboard from "./pages/overview";

// Import the protected route component, which prevents access to certain routes without authentication.
import { ProtectedRoute } from "./components/ProtectedRote/protectedRote";

// Import the "Page Not Found" page for nonexistent routes.
import PageNotFound from "./pages/pageNotFound";
import { useEffect } from "react";
import { VerifyToken } from "./components/VerifyToken/verifyToken";

// Main function that defines the application's route structure.
function App() {

  // Calls the function to verify if the token is valid when the page is rendered.
  useEffect(() => {
    VerifyToken();
  }, []);

  return (
    // <Router>: enables URL-based routing.
    <Router>
      {/* <Routes>: groups all routes defined in the application. */}
      <Routes>
        {/* Renders the "Page Not Found" component for any undefined route. */}
        <Route path="*" element={ <PageNotFound /> } />
        
        {/* Root route: Automatically redirects from "/" to "/home". */}
        <Route path="/" element={ <Navigate to={'/home'} /> } />
        
        {/* Route for the home page */}
        <Route path="/home" element={ <Home /> } />
        
        {/* Route for the login page */}
        <Route path="/login" element={ <Login /> } />
        
        {/* Route for the registration page */}
        <Route path="/register" element={ <Register /> } />
        
        {/*
          Protected route for the dashboard page: Only accessible if the user is authenticated.
          <ProtectedRoute>: checks authentication; if authenticated, renders the <Dashboard> component.
        */}
        <Route 
          path="/dashboard" 
          element={ 
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

// Exports the App component as default to be used for rendering the application.
export default App;
