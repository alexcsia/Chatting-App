import { FastifyInstance } from "fastify";
import { Server } from "socket.io";

export function setupWebsocketServer(fastify: FastifyInstance) {
  const allowedOrigin = process.env.CORS_ORIGIN;

  const io = new Server(fastify.server, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? allowedOrigin : "*",
    },
    path: "/ws",
  });

  io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);
    fastify.log.info(`User connected: ${socket.id}`);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    socket.on("sendMessage", (message) => {
      if (!message?.chatId || !message?.content || !message?.authorUsername) {
        console.error("Invalid message format", message);
        return;
      }
      console.log("Message received:", message);
      io.to(message.chatId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}
