import { Info, Login, User } from "@/types/types";  // Imports the Login, User, and Info types.
import axios from 'axios';  // Imports axios to make HTTP requests.

const url = 'https://web-project-sj2j.onrender.com';  // Defines the backend server URL that will receive the requests.

// Function to authenticate the user and return the JWT token.
export const authenticate = async (login: Login) => {
  // Checks if the login parameter was provided.
  if (!login) {
    throw new Error("Error: The login parameter is not defined!");  // If not, throw an error.
  }

  // Sends a POST request to the '/entrar' route, passing the login data.
  const response = await axios.post(`${url}/entrar`, login);

  // Returns the JWT token if the request is successful, or an error that will be handled and shown by the frontend toast.
  return response.data;
};

// Function to register a new user.
export const register = async (user: User) => {
  // Checks if the user parameter was provided.
  if (!user) {
    throw new Error("Error: The user parameter is not defined!");  // If not, throw an error.
  }

  // Sends a POST request to the '/cadastrar' route, passing the user data.
  const response = await axios.post(`${url}/cadastrar`, user);

  // Returns a success message if the request is successful, or an error that will be handled and shown by the frontend toast.
  return response.data;
};

// Function to get the data of the logged-in user.
export const getUser = async () => {
  // Attempts to get the authentication token stored in localStorage.
  const token = localStorage.getItem("authToken");

  // If the token is not found, throw an error.
  if (!token) {
    throw new Error("Error: The token is not defined!");
  }

  // Sends a GET request to the '/central' route, including the token in the Authorization header.
  const response = await axios.get(`${url}/central`, {
    headers: {
      // Adds the token to the request header for authentication.
      'Authorization': `Bearer ${token}`,
    },
  });

  // Returns the user data if the request is successful, or an error that will be handled and shown by the frontend toast.
  return response.data;
};

// Function to update the user's information.
export const updateInfo = async (info: Info) => {
  // Attempts to get the authentication token stored in localStorage.
  const token = localStorage.getItem("authToken");

  // If the token is not found, throw an error.
  if (!token) {
    throw new Error("Error: The token is not defined!");
  }

  // Checks if the info parameter was provided.
  if (!info) {
    throw new Error("Error: The info parameter is not defined!");
  }

  // Sends a PUT request to the '/central' route, passing the new information in the request body.
  const response = await axios.put(`${url}/central`, info, {
    // Adds the token to the request header for authentication.
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  // Returns a success message if the request is successful, or an error that will be handled and shown by the frontend toast.
  return response.data;
};
