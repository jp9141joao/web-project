import { Request, Response, NextFunction } from 'express'; // Imports Express types to manage HTTP requests, responses, and next function.
import jwt, { JwtPayload } from 'jsonwebtoken'; // Imports JWT library and JwtPayload type for token handling.
import dotenv from 'dotenv'; // Imports dotenv to load environment variables.
import { HttpResult } from '../models/http-result'; // Imports HttpResult model to standardize HTTP responses.

dotenv.config(); // Loads variables defined in the .env file.

const SECRET_KEY = process.env.SECRET_KEY; // Retrieves the secret key from environment variables.

if (!SECRET_KEY) {
  // Throws an error if SECRET_KEY is not defined.
  throw new Error("SECRET_KEY is not defined in the .env file!");
}

// Middleware to ensure only users with a valid token can access certain routes.
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Retrieves the Authorization header containing the token sent by the frontend.
  const authHeader = req.headers['authorization'];

  // If the header is missing, throw an error indicating no token was provided.
  if (!authHeader) {
    throw new Error("Access denied, token not provided!");
  }

  // If the token comes in the format "Bearer <token>", split to get only the token part.
  const token = authHeader.split(' ')[1];

  // If no token is found after splitting, throw an error indicating no token was provided.
  if (!token) {
    throw new Error("Access denied, token not provided!");
  }

  try {
    // Verifies if the token is valid using the secret key.
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // If valid, stores the decoded user data in the request object for later use.
    (req as any).user = decoded;

    // Proceeds to the next middleware or route handler.
    next();
  } catch (error: any) {
    // If verification fails, returns a 400 response with an error message.
    res.status(400).json(HttpResult.Fail("An unexpected error occurred in authMiddleware"));
  }
};
