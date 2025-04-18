import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { IMessage } from "@models/Message";
import redisUtils from "redis";
import { joinChat, disconnect, sendMessage } from "./events";
import { updateCachedMessages } from "redis/cache";

const activeChats = new Map<string, Set<string>>();

export function setupWebsocketServer(fastify: FastifyInstance) {
  const allowedOrigin = process.env.CORS_ORIGIN;

  const io = new Server(fastify.server, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? allowedOrigin : "*",
    },
    path: "/ws",
  });

  redisUtils.subscribeRedis();

  redisUtils.receiveMessage(async (message: IMessage) => {
    try {
      if (activeChats.has(message.chatId)) {
        io.to(message.chatId).emit("receiveMessage", message);
        await updateCachedMessages(message.chatId, message);
      }
    } catch (err) {
      fastify.log.error({ err, message }, "error when receiving redis pubsub");
    }
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", joinChat(socket, activeChats, fastify));
    socket.on("sendMessage", sendMessage(socket, fastify));
    socket.on("disconnect", disconnect(socket, activeChats, fastify));
  });

  return io;
}
