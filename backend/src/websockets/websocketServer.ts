import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { IMessage } from "@models/Message";
import redisUtils from "redis";
import { messageSchema } from "./validation/message.schema";
import { joinChat } from "./events";
import { sendMessage } from "./events/sendMessage";

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
    socket.on("joinChat", joinChat(socket, activeChats));
    socket.on("sendMessage", sendMessage(socket));

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
