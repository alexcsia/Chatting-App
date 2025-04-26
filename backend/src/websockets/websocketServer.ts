import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import redisUtils from "redisDb";
import { joinChat, disconnect, sendMessage } from "./events";
import { receiveMessage } from "./events/receiveMessage";

const activeChats = new Map<string, Set<string>>();

export function setupWebsocketServer(fastify: FastifyInstance) {
  try {
    const allowedOrigin = process.env.CORS_ORIGIN;

    const io = new Server(fastify.server, {
      cors: {
        origin: process.env.NODE_ENV === "production" ? allowedOrigin : "*",
      },
      path: "/ws",
    });

    redisUtils.subscribeRedis(receiveMessage(io, activeChats, fastify));

    io.on("connection", (socket) => {
      console.log("socket connected:", socket.id);
      socket.on("joinChat", joinChat(socket, activeChats, fastify));
      socket.on("sendMessage", sendMessage(socket, fastify));
      socket.on("disconnect", disconnect(socket, activeChats, fastify));
    });
    console.log("ws server is set up");
    return io;
  } catch (error: unknown) {
    fastify.log.error("error setting up ws server:", error);
    throw error;
  }
}
