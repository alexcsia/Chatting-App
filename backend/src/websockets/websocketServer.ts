import { FastifyInstance } from "fastify";
import { Server } from "socket.io";

export function setupWebsocketServer(fastify: FastifyInstance) {
  const io = new Server(fastify.server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", (message) => {
      console.log("Message received:", message);
      socket.broadcast.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}
