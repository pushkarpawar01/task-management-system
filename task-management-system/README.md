# MERN Task Management System

A sleek, modern task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Modern UI**: Dark mode with glassmorphism and smooth transitions.
- **Full CRUD**: Create, read, update (toggle completion), and delete tasks.
- **Responsive Design**: Works on mobile and desktop.
- **Deployment Ready**: Configured for easy deployment.

## Tech Stack
- **Frontend**: React, Vite, Axios, Lucide React, Vanilla CSS.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Dotenv, CORS.

## Getting Started

### Prerequisites
- Node.js installed.
- MongoDB instance (local or Atlas).

### Installation
1. Clone the repository.
2. Run `npm run install-all` from the root directory to install all dependencies for both client and server.

### Local Development
1. Start the backend:
   ```bash
   npm run server
   ```
2. Start the frontend:
   ```bash
   npm run client
   ```
   The frontend will be available at `http://localhost:5173`.

### Environment Variables
Create a `.env` file in the `server` directory with:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Deployment
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Set `NODE_ENV=production` in your hosting environment.
3. The server is configured to serve the production build of the frontend from the `client/dist` directory.
