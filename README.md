# Chatting Application (a better name is in the works)

A chatting application that relies on websockets and provides secure user authentication,
real-time messaging with caching and persistance, as well container-to-container communication using Pub/Sub.

---

## Features

- **User Authentication & Authorization**:

  - Sign up, log in, log out
  - Secure authentication using JWT
  - User data is validated and stored securely using MongoDB Atlas

- **Real-Time Chat**:

  - Send and receive messages in real-time via websockets
  - Chat with other users who are online or offline
  - Infinite scrolling chat

- **Friend Management**:

  - Add other users as friends
  - View your list of friends and be able to message them or start new chats

- **Profile Page**:

  - View your active chats and profile

- **Performance**:

  - Caching of chat messages to reduce database load
  - Lazy loading avoids loading the entire message history at once

- **Scalability**

  - Users can talk to each other no matter if they are connected to different containers
  - The backend can be deployed with multiple container instances (via Google Cloud Run) to handle increased load

---

## Tech stack

- **Frontend**: Vue.js, Axios
- **Backend**: Fastify(Node.js), Websockets, Typescript
- **Database**: MongoDB Atlas
- **Caching and Pub/Sub**: Redis Cloud
- **Containerization**: Docker
- **Deployment**: Google Cloud Run
- **Testing**: Jest

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB client (running locally or remotely)
- Redis client (running locally or remotely)
- Docker
- npm or yarn

---

### Installation

- Clone repository

  git clone https://github.com/alexcsia/Chatting-App.git

- Install dependencies

  npm install

- Environment variables (backend)

  Create a .env file inside backend folder and create these variables:
  MONGODB_URI, PORT, JWT_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV, ENABLE_CORS, CORS_ORIGIN, REDIS_URL

- Environment variables (frontend)
  Create a .env file inside frontend folder and create these variables:
  VITE_BACKEND_URL

### Starting the application

_Make sure you are running an instance of MongoDB and Redis, either locally, with Docker or remotely_

- Starting the application in dev mode:

npm run dev

- Starting in production mode:

npm run build

npm start

- Testing backend:

npm run test

### CI/CD Deployment

This project uses GitHub Actions for continuous integration and deployment. On every push:

- The backend tests run
- Both the backend and the frontend are compiled and bundled
- The backend is containerized and pushed to Google Artifact Registry
- The Docker image is deployed to the Cloud Run service with secrets passed from Secret Manager.

_The frontend (deployed with Vercel) re-deploys automatically_
