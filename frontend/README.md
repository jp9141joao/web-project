# Rick and Morty API - Frontend

This project is the frontend interface for the Rick and Morty API application. Currently, it focuses solely on the presentation layer, allowing users to explore character information such as name, location, species, and gender. It also enables users to register, log in, and update their information (name, email, and password).

## Technologies Used

* **React** – A library for building dynamic, component-based user interfaces.
* **TypeScript** – Adds static typing to JavaScript for increased robustness during development.
* **Tailwind CSS** – A utility-first CSS framework for creating responsive, styled layouts.
* **React Router DOM** – Manages client-side routing within the application.
* **Custom UI Components** – Reusable UI components (Inputs, Spinners, etc.) to standardize the design.

## Prerequisites

* [Node.js](https://nodejs.org/) (version 14 or higher)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

To verify that Node.js and npm are installed, run:

```bash
node -v
npm -v
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jp9141joao/rick-and-morty-api.git
   ```

2. **Navigate to the frontend folder**

   ```bash
   cd frontend
   ```

3. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or, if you prefer Yarn:

   ```bash
   yarn install
   ```

## Usage

To start the development server and view the application in your browser, run:

```bash
npm run dev
```

Or, if you’re using Yarn:

```bash
yarn dev
```

The application will typically be available at [http://localhost:3000](http://localhost:3000), though the port may vary.

## Project Structure

Below is an overview of the project’s folder structure:

```
rick-and-morty-api/
└── frontend/
    ├── .vite/                  # Vite’s cache directory
    ├── dist/                   # Production build output
    ├── node_modules/           # Installed dependencies
    ├── public/                 # Static files and index.html
    ├── src/
    │   ├── assets/             # Images and other resources
    │   ├── components/         # Reusable components (layouts, buttons, inputs, etc.)
    │   │   ├── PageLayout/     # Layout wrapper component
    │   │   ├── RotaProtegida/  # “ProtectedRoute” component
    │   │   ├── ui/             # Generic UI elements (Input, Spinner, etc.)
    │   │   ├── VerificarToken/ # “VerifyToken” component
    │   │   ├── Creditos.tsx    # Credits component
    │   │   └── Voltar.tsx      # Back button component
    │   ├── hooks/              # Custom React hooks
    │   │   └── use-toast.ts     # Hook for toast notifications
    │   ├── lib/                # Utility functions
    │   │   └── utils.ts
    │   ├── pages/              # Page components (register, dashboard, login, home, 404, etc.)
    │   │   ├── cadastrar.tsx            # “register” page
    │   │   ├── central.tsx              # “dashboard” page
    │   │   ├── entrar.tsx               # “login” page
    │   │   ├── inicio.tsx               # “home” page
    │   │   └── paginaNaoEncontrada.tsx  # “pageNotFound” page
    │   ├── service/            # API integration services
    │   ├── types/              # TypeScript type definitions
    │   ├── app.css
    │   ├── app.tsx             # Root component of the application
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── .gitignore
    ├── componentes.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json            # Project configuration and dependencies
    ├── postcss.config.js
    ├── tailwind.config.js      # Tailwind CSS configuration
    ├── ts.config.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Useful Commands

* **Install dependencies:**
  `npm install` or `yarn install`

* **Start the development server:**
  `npm run dev` or `yarn dev`

* **Build for production:**
  `npm run build` or `yarn build`

## Notes

* **External API:**
  This frontend consumes data from the [Rick and Morty API](https://rickandmortyapi.com/). Make sure your device has an active internet connection so that character data can load correctly.

* **Backend URL:**
  If the backend is running locally or on a different host, remember to update the base URL in the service configuration file to point to your server. For example, if your backend runs at `http://localhost:3001`, adjust the URL in the service accordingly.

* **Customizations:**
  If you need to tweak the styling, check the `tailwind.config.js` file and the components in the `src/components/` folder.
