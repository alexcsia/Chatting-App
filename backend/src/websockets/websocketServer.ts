import { FastifyInstance } from "fastify";
import { Server } from "socket.io";

export function setupWebsocketServer(fastify: FastifyInstance) {
  const io = new Server(fastify.server, {
    cors: {
      origin: "*",
    },
    path: "/ws",
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    socket.on("sendMessage", (message) => {
      console.log("Message received:", message);
      io.to(message.chatId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}
