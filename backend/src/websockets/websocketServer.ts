import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { IMessage } from "@models/Message";
import redisUtils from "redis";
import { messageSchema } from "./validation/message.schema";

const activeChats = new Set<string>();

export function setupWebsocketServer(fastify: FastifyInstance) {
  const allowedOrigin = process.env.CORS_ORIGIN;

  const io = new Server(fastify.server, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? allowedOrigin : "*",
    },
    path: "/ws",
  });

  redisUtils.subscribeRedis();

  redisUtils.receiveMessage((message: IMessage) => {
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

    socket.on("sendMessage", (receivedMessage) => {
      const result = messageSchema.safeParse(receivedMessage);

      if (!result.success) {
        console.error("invalid message format", result.error.format());
        return;
      }

      const message = result.data;

      console.log("Message received:", message);

      redisUtils.publishToRedis(message);
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
