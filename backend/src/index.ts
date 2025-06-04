import express from 'express'; // Imports Express to create the server.
import cors from 'cors'; // Imports the CORS middleware to control who can access the API.
import { routes } from './routes'; // Imports the routes defined in another file.

const app = express(); // Creates an instance of Express.
const port = process.env.PORT || 3000; // Defines the server port; if it doesn't exist, defaults to 3000.

// List of allowed origins to access the API.
const allowedOrigins = [
  'https://web-project-jp.netlify.app',
];

app.use(cors({
  origin: function(origin, callback) {
    // If there is no origin, allow access.
    if (!origin) return callback(null, true);

    // If the origin is not in the allowed list, return an error.
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'Server CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }

    // If the origin is allowed, allow access.
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods that can be used.
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers allowed in requests.
}));

app.use(express.json()); // Makes Express understand JSON sent in request bodies.
app.use(routes); // Uses the imported routes to handle incoming requests.

// Starts the server on the defined port and logs a message to the console.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
