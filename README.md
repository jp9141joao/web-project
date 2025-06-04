# Rick and Morty API

The **Rick and Morty API** project integrates a modern frontend interface with a robust backend, allowing exploration of the series’ characters and offering full user authentication and management features.

## Overview

* **Frontend:**
  Developed with React, TypeScript, and Tailwind CSS, the frontend is an SPA that displays character information (name, location, species, gender, etc.) and allows users to register, log in, and update their data.

* **Backend:**
  Built with Express and TypeScript, the backend uses Prisma as an ORM to interact with a PostgreSQL database. The application implements JWT-based authentication, data validation, and CRUD operations for users.

## Web Access

You can access the hosted project via the following link:
[https://rick-and-morty-api-jp9141joao.netlify.app/inicio](https://rick-and-morty-api-jp9141joao.netlify.app/inicio)

> **Note:** Since the deployment services used are free, there may be longer response times for backend requests.

## Main Features

* **Authentication and Authorization:**
  JWT-based authentication implementation with middleware to protect sensitive routes.

* **User Management:**
  Endpoints for account creation, login, fetching user data, and updating information (personal data and password).

* **Integration with External API:**
  The frontend consumes data from the [Rick and Morty API](https://rickandmortyapi.com/) to display up-to-date character information.

## Project Structure

The repository is organized as follows:

```
rick-and-morty-api/
├── frontend/   # User interface (SPA)
└── backend/    # API server (Express, Prisma)
```

Each folder contains its own detailed README with specific installation, configuration, and execution instructions.

## Accessing the Internal READMEs

To view the technical details and usage instructions for each part of the project, you can access the READMEs directly via the terminal or your code editor.

### Via Terminal

1. **Frontend:**
   Navigate to the `frontend` folder and read the README:

   ```bash
   cd frontend
   cat README.md
   ```

2. **Backend:**
   Navigate to the `backend` folder and read the README:

   ```bash
   cd backend
   cat README.md
   ```

### Via Code Editor

Open the repository in your favorite editor and navigate to the `frontend` and `backend` folders to view their respective `README.md` files.

### Project Demo

![screenshot1](./assets/image1.png)
![screenshot2](./assets/image2.png)
![screenshot3](./assets/image3.png)

## Notes

For more details about the project, consult the README files in the **frontend** and **backend** folders.
