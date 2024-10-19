### Epicode module 6 practice

# PHONES MARKETPLACE

A simple marketplace for buying and selling phones, built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database to store phone listings and user data.


## Features

- List available phones with details.
- Users can rate phones using a 5-star rating system.
- Multilingual support with i18next.
- Backend API built with Express and connected to MongoDB.


## Tech Stack

### Frontend
- React.js: Frontend framework.
- React-Bootstrap: Styling and UI components.
- React Router Dom: For routing between different views.
- i18next: For internationalization and localization.
- react-rating-stars-component: For the rating system in the product details.

### Backend
- Node.js: Backend runtime.
- Express: Server framework.
- Mongoose: For interacting with MongoDB.
- dotenv: For environment variable management.
- cors: Middleware to handle cross-origin requests.

### Development tools
- nodemon: Automatically restarts the server on file changes (dev only).


## Installation

Project is divided in two folders:
- **backend**: server logic;
- **frontend**: react app.

### Run the server

- in the ```/backend``` directory, create a ```.env``` file:
```env
MONGODB_URI=<your-mongodb-uri>
```

- open terminal and move to backend directory
```bash
cd backend
```
- install dependencies
```bash
npm i
```

- run the command to start the server locally
```bash
npm run dev
```

- should display a message in the terminal if connection is successfull.

### Run the app

- in the ```/frontend```directory, create a ```.env``` file:
```env
VITE_API_BASE_URL=<your-localhost-url-for-backend>
```

- open a **new** terminal and move to the frontend directory
```bash
cd frontend
```

- install dependencies
```bash
npm i
```

- run the command to start the app
```bash
npm run dev
```

- the app should now start on ```http://localhost:5173```
