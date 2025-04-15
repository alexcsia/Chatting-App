import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { receiveMessage } from "redis/sub";
import { IMessage } from "@models/Message";
import { subscribeRedis } from "redis/sub";
import { publishToRedis } from "redis/pub";

const activeChats = new Set<string>();

export function setupWebsocketServer(fastify: FastifyInstance) {
  const allowedOrigin = process.env.CORS_ORIGIN;

  const io = new Server(fastify.server, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? allowedOrigin : "*",
    },
    path: "/ws",
  });

  subscribeRedis();

  receiveMessage((message: IMessage) => {
    if (activeChats.has(message.chatId)) {
      io.to(message.chatId).emit("receiveMessage", message);
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      socket.data.chatId = chatId;
      activeChats.add(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    //use zod to validate
    socket.on("sendMessage", (message: IMessage) => {
      if (
        !message?.chatId ||
        !message?.content ||
        !message?.authorUsername ||
        !message?.timeStamp
      ) {
        console.error("Invalid message format", message);
        return;
      }

      console.log("Message received:", message);

      publishToRedis(message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      const chatId = socket.data.chatId;
      console.log(socket.data);
      if (chatId) {
        activeChats.delete(chatId);
        console.log("removed from active chats:", chatId);
      }
    });
  });

  return io;
}
