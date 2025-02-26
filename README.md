# Chatting Application

A real-time chatting application built with **MongoDB**, **TypeScript**, **Fastify**, **Vue.js**, and **Redis**. This application provides secure user authentication, real-time messaging and friend list management

---

## Features

- **User Authentication & Authorization**:

  - Secure JWT-based authentication.
  - User registration and login.

- **Real-Time Chat**:

  - Send and receive messages in real-time.
  - Chat with other users who are online.

- **Friend Management**:

  - Add other users as friends.
  - View your list of friends and their online status.

- **Profile Page**:

  - Update your profile information (e.g., name, profile picture).
  - View your activity and chat history.

- **Caching with Redis**:
  - Improve performance with Redis caching for frequently accessed data, such as messages.

---

## Technologies Used

- **Backend**:

  - **Fastify**: A fast and low-overhead web framework for Node.js.
  - **TypeScript**: For type-safe and scalable code.
  - **MongoDB**: A NoSQL database for storing user data, messages, and friend lists.
  - **Redis**: For caching and improving application performance.
  - **JSON Web Tokens (JWT)**: For secure user authentication and authorization.
  - **Redis**: For message caching

- **Frontend**:

  - **Vue.js**: A progressive JavaScript framework for building user interfaces.
  - **Axios**: For making HTTP requests to the backend.

- **Real-Time Communication**:
  - **WebSocket**: For real-time messaging between users.

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remotely)
- Redis (running locally or remotely)
- npm or yarn

---
