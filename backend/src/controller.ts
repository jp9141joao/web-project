import { Request, Response } from 'express'; // Express types to manage HTTP requests and responses.
import { PrismaClient } from "@prisma/client"; // Prisma client for database interaction.
import { HttpResult } from "./models/http-result"; // Model to standardize HTTP responses (success or error).
import { UpdateInfo, CreateAccount, Login } from './request'; // Custom types for account-related requests.
import { Utils } from './utils/utils'; // Utility functions for validations (e.g., email, password, name validation).
import dotenv from 'dotenv'; // Loads environment variables from the .env file.
import bcrypt from 'bcryptjs'; // Library to hash and compare passwords.
import jwt from 'jsonwebtoken'; // Library to generate and verify JWT tokens.

dotenv.config(); // Load environment variables defined in the .env file.
const SECRET_KEY = process.env.SECRET_KEY; // Secret key used to sign JWT tokens.
const prisma = new PrismaClient(); // Create an instance of PrismaClient for database communication.

// Function to authenticate a user using email and password.
export const authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract email and password from the request body, typed as Login.
    const { email, password } = req.body as Login;

    // Check if SECRET_KEY is defined; if not, throw an error.
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the .env file!");
    }

    // Validate that email was provided and has a valid format and acceptable length.
    if (!Utils.valueExists(email)) {
      res.status(200).json(HttpResult.Fail("Error: Email not provided!"));
      return;
    } else if (email.length > 255 || !Utils.validEmail(email)) {
      res.status(200).json(HttpResult.Fail("Error: Invalid email format!"));
      return;
    }

    // Validate that password was provided and meets format and length criteria.
    if (!Utils.valueExists(password)) {
      res.status(200).json(HttpResult.Fail("Error: Password not provided!"));
      return;
    } else if (password.length > 255 || !Utils.validPassword(password)) {
      res.status(200).json(HttpResult.Fail("Error: Invalid password format!"));
      return;
    }

    // Look for a user in the database with the provided email.
    const user = await prisma.tb_usuario.findUnique({
      where: {
        email: email,
      }
    });

    // If no user is found, return a credentials error.
    if (!user) {
      res.status(200).json(HttpResult.Fail("Error: Incorrect email or password!"));
      return;
    }

    // Compare the provided password with the hashed password in the database.
    const isPasswordValid = await bcrypt.compare(password, user.senha);

    // If the password does not match, return a credentials error.
    if (!isPasswordValid) {
      res.status(200).json(HttpResult.Fail("Error: Incorrect email or password!"));
      return;
    }

    // Convert the user ID to string to include in the token.
    const id = user.id.toString();

    // Generate a JWT token with the user ID and a 1-hour expiration.
    const token = jwt.sign(
      { id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Return the generated token as a success response.
    res.status(200).json(HttpResult.Success(token));
  } catch (error: any) {
    // In case of error, return a 400 response with an error message and log the error.
    console.error(error);
    res.status(400).json(HttpResult.Fail("An unexpected error occurred in authenticate."));
  }
};

// Function to create a new user account.
export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract name, email, and password from the request body, typed as CreateAccount.
    const { name, email, password } = req.body as CreateAccount;

    // Check if SECRET_KEY is defined; if not, return an error.
    if (!SECRET_KEY) {
      res.status(400).json(HttpResult.Fail("SECRET_KEY is not defined in the .env file!"));
      return;
    }

    // Validate that name was provided, is in the correct format, and does not exceed maximum length.
    if (!Utils.valueExists(name)) {
      res.status(200).json(HttpResult.Fail("Error: Full name not provided!"));
      return;
    } else if (!Utils.validName(name)) {
      res.status(200).json(HttpResult.Fail("Error: Invalid full name format!"));
      return;
    } else if (name.length > 30) {
      res.status(200).json(HttpResult.Fail("Error: Full name too long!"));
      return;
    }

    // Validate that email was provided, is in the correct format, and does not exceed maximum length.
    if (!Utils.valueExists(email)) {
      res.status(200).json(HttpResult.Fail("Error: Email not provided!"));
      return;
    } else if (!Utils.validEmail(email)) {
      res.status(200).json(HttpResult.Fail("Error: Invalid email format!"));
      return;
    } else if (email.length > 255) {
      res.status(200).json(HttpResult.Fail("Error: Email too long!"));
      return;
    }

    // Validate that password was provided, meets expected format, and does not exceed maximum length.
    if (!Utils.valueExists(password)) {
      res.status(200).json(HttpResult.Fail("Error: Password not provided!"));
      return;
    } else if (!Utils.validPassword(password)) {
      res.status(200).json(HttpResult.Fail("Error: Invalid password format!"));
      return;
    } else if (password.length > 255) {
      res.status(200).json(HttpResult.Fail("Error: Password too long!"));
      return;
    }

    // Check if there is already a user registered with the same email.
    const emailExists = (await prisma.tb_usuario.count({
      where: {
        email: email
      }
    })) > 0;

    // If the email is already registered, return an error.
    if (emailExists) {
      res.status(200).json(HttpResult.Fail("Error: Email already registered!"));
      return;
    }

    // Hash the password using bcrypt with 10 salt rounds.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the provided data.
    await prisma.tb_usuario.create({
      data: {
        nome: name,
        email: email,
        senha: hashedPassword
      }
    });

    // Return a success response indicating that the account was created.
    res.status(200).json(HttpResult.Success("Account created successfully!"));
  } catch (error: any) {
    // In case of error, return a 400 response with an error message and log the error.
    console.error(error);
    res.status(400).json(HttpResult.Fail("An unexpected error occurred in createAccount."));
  }
};

// Function to retrieve the authenticated user's data from the JWT token.
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get the authorization token from the request headers.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Check if SECRET_KEY is defined; if not, return an error.
    if (!SECRET_KEY) {
      res.status(400).json(HttpResult.Fail("SECRET_KEY is not defined in the .env file!"));
      return;
    }

    // If no token was provided, return an authorization error.
    if (!token) {
      res.status(401).json(HttpResult.Fail("Error: Token not provided!"));
      return;
    }

    // Verify and decode the JWT token using SECRET_KEY.
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const id = decoded.id;

    // If the token does not contain an ID, return an error.
    if (!id) {
      res.status(400).json(HttpResult.Fail("Error: Provided token is invalid!"));
      return;
    }

    // Look for a user in the database with the extracted ID.
    const user = await prisma.tb_usuario.findUnique({
      where: {
        id: BigInt(id)
      }
    });

    // If no user is found, throw an error.
    if (!user) {
      throw new Error("Error: User does not exist!");
    }

    // Format the user data, converting the ID to string (because it is a BigInt).
    const formattedUser = {
      ...user,
      id: user.id.toString(),
    };

    // Return the user data in a success response.
    res.status(200).json(HttpResult.Success(formattedUser));
  } catch (error: any) {
    // In case of error, return a 400 response with an error message and log the error.
    console.error(error);
    res.status(400).json(HttpResult.Fail("An unexpected error occurred in getUser."));
  }
};

// Function to update user information (personal data or password).
export const updateInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract request data for update: name, email, password, newPassword, and operation type, typed as UpdateInfo.
    const { name, email, password, newPassword, operation } = req.body as UpdateInfo;
    // Get the authorization token from the headers.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Check if SECRET_KEY is defined; if not, return an error.
    if (!SECRET_KEY) {
      res.status(400).json(HttpResult.Fail("SECRET_KEY is not defined in the .env file!"));
      return;
    }

    // If no token was provided, return an authorization error.
    if (!token) {
      res.status(401).json(HttpResult.Fail("Error: Token not provided!"));
      return;
    }

    // Decode the JWT token to extract the user ID.
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const id = decoded.id;

    // If the token does not contain a valid ID, return an error.
    if (!id) {
      res.status(400).json(HttpResult.Fail("Error: Provided token is invalid!"));
      return;
    }

    // Look for the user in the database using the extracted ID.
    const user = await prisma.tb_usuario.findUnique({
      where: {
        id: BigInt(id),
      }
    });

    // If the user does not exist, return a 404 error.
    if (!user) {
      res.status(404).json(HttpResult.Fail("Error: User does not exist!"));
      return;
    }

    // Initialize updatedUser with the current user data.
    let updatedUser = user;

    // If the requested operation is to update personal info (name or email):
    if (operation === "Info") {
      // Validate that name was provided.
      if (!name) {
        res.status(200).json(HttpResult.Fail("Error: Full name not provided!"));
        return;
      }

      // Validate that email was provided.
      if (!email) {
        res.status(200).json(HttpResult.Fail("Error: Email not provided!"));
        return;
      }

      // If the provided name is different from the current one, validate format and length of the new name.
      if (name !== user.nome) {
        if (!Utils.validName(name)) {
          res.status(200).json(HttpResult.Fail("Error: Invalid full name format!"));
          return;
        } else if (name.length > 30) {
          res.status(200).json(HttpResult.Fail("Error: Full name too long!"));
          return;
        }
        // Update name in updatedUser object.
        updatedUser = { ...updatedUser, nome: name };
      }

      // If the provided email is different from the current one, validate format, length, and uniqueness.
      if (email && email !== user.email) {
        if (!Utils.validEmail(email)) {
          res.status(200).json(HttpResult.Fail("Error: Invalid email format!"));
          return;
        } else if (email.length > 255) {
          res.status(200).json(HttpResult.Fail("Error: Email too long!"));
          return;
        }

        const emailExists = (await prisma.tb_usuario.count({
          where: {
            email: email
          }
        })) > 0;

        if (emailExists) {
          res.status(200).json(HttpResult.Fail("Error: Email already registered!"));
          return;
        }

        // Update email in updatedUser object.
        updatedUser = { ...updatedUser, email: email };
      }
    }

    // If the requested operation is to update password:
    if (operation === "Password") {
      // Validate that current password was provided.
      if (!password) {
        res.status(200).json(HttpResult.Fail("Error: Password not provided!"));
        return;
      }

      // Validate that newPassword was provided.
      if (!newPassword) {
        res.status(200).json(HttpResult.Fail("Error: New password not provided!"));
        return;
      }

      // Verify that current password meets format and length criteria.
      if (password.length > 255 || !Utils.validPassword(password)) {
        res.status(200).json(HttpResult.Fail("Error: Invalid password format!"));
        return;
      }

      // Compare provided current password with the stored password to validate authenticity.
      const isCurrentPasswordValid = await bcrypt.compare(password, user.senha);
      if (!isCurrentPasswordValid) {
        res.status(200).json(HttpResult.Fail("Error: Incorrect password!"));
        return;
      }

      // Validate that newPassword meets format and length criteria.
      if (!Utils.validPassword(newPassword)) {
        res.status(200).json(HttpResult.Fail("Error: Invalid new password format!"));
        return;
      } else if (newPassword.length > 255) {
        res.status(200).json(HttpResult.Fail("Error: New password too long!"));
        return;
      }

      // Ensure newPassword is not the same as the current password.
      const isNewPasswordSame = await bcrypt.compare(newPassword, user.senha);
      if (isNewPasswordSame) {
        res.status(200).json(HttpResult.Fail("Error: New password is the same as the old one!"));
        return;
      }

      // Hash the new password for secure storage.
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the password in updatedUser object.
      updatedUser = { ...updatedUser, senha: hashedNewPassword };
    }

    // Update the user data in the database with the modified information.
    const updatedUserRecord = await prisma.tb_usuario.update({
      where: {
        id: BigInt(id),
      },
      data: updatedUser
    });

    // Format the updated user object, converting ID to string (since it is BigInt).
    const formattedUser = {
      ...updatedUserRecord,
      id: updatedUserRecord.id.toString(),
    };

    // Return the updated user data in a success response.
    res.status(200).json(HttpResult.Success(formattedUser));
  } catch (error: any) {
    // In case of error, return a 400 response with an error message and log the error.
    console.error(error);
    res.status(400).json(HttpResult.Fail("An unexpected error occurred in updateInfo."));
  }
};
