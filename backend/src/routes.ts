import { Router } from "express"; // Brings Express’s Router to define the application’s routes
import { authMiddleware } from "./middlewares/authMiddleware"; // Imports the middleware that checks if the user is authenticated
import { updateInfo, authenticate, createAccount, getUser } from "./controller"; // Imports the functions that will handle user operations

const routes = Router(); // Creates a new routes object

// Calls the authenticate function when someone sends a POST to the "/enter" route.
routes.post('/enter', authenticate);
// Calls the createAccount function when someone sends a POST to the "/register" route.
routes.post('/register', createAccount);

// Calls the getUser function when someone sends a GET to the "/central" route.
// Before calling getUser, it passes through authMiddleware to check if the token is valid.
routes.get('/central', authMiddleware, getUser);

// Calls the updateInfo function when someone sends a PUT to the "/central" route.
// Also uses authMiddleware to ensure the user is authenticated before updating data.
routes.put('/central', authMiddleware, updateInfo);

export { routes }; // Exports the routes so they can be used elsewhere in the application
