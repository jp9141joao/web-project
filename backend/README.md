# Rick and Morty API - Backend

This is the backend server for the Rick and Morty API application, developed in TypeScript with Express and Prisma. It handles authentication, user creation, and updates, as well as providing the routes for integration with the frontend.

## Technologies Used

* **Express** – Framework for building the web server.
* **TypeScript** – Language with static typing for greater robustness and maintainability.
* **Prisma** – ORM for interacting with the PostgreSQL database.
* **PostgreSQL** – Relational database used by the application.
* **JWT (jsonwebtoken)** – For authentication and token generation.
* **bcrypt / bcryptjs** – For hashing and verifying passwords.
* **dotenv** – Environment variable management.
* **cors** – Cross-Origin Resource Sharing control.

## Prerequisites

* [Node.js](https://nodejs.org/) (version 14 or higher)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

To check if Node.js and npm are installed, run:

```bash
node -v
npm -v
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jp9141joao/rick-and-morty-api.git
   ```

2. **Navigate to the backend folder**

   ```bash
   cd backend
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

## Configuration

* **Environment Variables:**
  Copy the `.env.exp` file to `.env` and configure the variables as needed. The required variables are:

  * `DATABASE_URL`: Connection URL for the PostgreSQL database.
  * `SECRET_KEY`: Secret key for signing JWT tokens.

* **Allowed Origins (CORS):**
  In the `src/index.ts` file, there is a list of allowed origins (`allowedOrigins`). If the frontend origin changes or if you run the application locally, **remember to update this list** to allow access, as well as adjust the `PORT` variable if running locally.

## Project Structure

```
rick-and-morty-api/
└── frontend/
    └── backend/
        ├── dist/                   # Application build for production
        ├── node_modules/           # Installed dependencies
        ├── prisma/                 # Prisma configuration files and migrations
        ├── src/
        │   ├── authMiddleWares/    # Authentication middlewares
        │   │   └── authMiddleWares.ts
        │   ├── models/             # Models (e.g., http-result.ts)
        │   ├── utils/              # Utility functions (e.g., utils.ts)
        │   ├── controller.ts       # Control logic for operations (login, registration, etc.)
        │   ├── index.ts            # Application entry point (server configuration)
        │   ├── request.ts          # Types and interfaces for requests
        │   └── routes.ts           # API route definitions
        ├── .env.exp                # Example environment variable configuration
        ├── .gitignore              # Files to ignore in version control
        ├── package-lock.json       # npm lockfile
        ├── package.json            # Project configurations and scripts
        └── tsconfig.json           # TypeScript configuration
```

## Available Scripts

* **Development:**
  Start the server in development mode with hot-reloading:

  ```bash
  npm run dev
  ```

* **Build for Production:**
  Compile the TypeScript project to JavaScript:

  ```bash
  npm run build
  ```

* **Start in Production:**
  After building, start the server from the compiled files:

  ```bash
  npm start
  ```

## Important

* **.env:**
  Make sure to configure the `.env` file correctly with the `DATABASE_URL` and `SECRET_KEY` variables.

* **Allowed Origins:**
  In `src/index.ts`, check and, if necessary, update the `allowedOrigins` array to reflect your frontend’s origin, especially if running the backend locally.

* **Prisma:**
  If needed, use the Prisma commands to generate the database models in the Prisma schema:

  ```bash
  cd prisma
  npx prisma db pull
  npx prisma generate
  ```
