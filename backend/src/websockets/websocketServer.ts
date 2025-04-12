import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { pub, sub } from "../redis";

interface IChatMessage {
  content: string;
  chatId: string;
  authorUsername: string;
  timeStamp: string;
}

const activeChats = new Set<string>();

export function setupWebsocketServer(fastify: FastifyInstance) {
  const allowedOrigin = process.env.CORS_ORIGIN;

  const io = new Server(fastify.server, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? allowedOrigin : "*",
    },
    path: "/ws",
  });

  sub.subscribe("chat", () => {
    console.log("subscribed to redis channel");
  });

  sub.on("message", (channel, rawMessage) => {
    const message: IChatMessage = JSON.parse(rawMessage);
    console.log("message", message, "channel", channel);

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
    socket.on("sendMessage", (message: IChatMessage) => {
      if (
        !message?.chatId ||
        !message?.content ||
        !message?.authorUsername
        // || !message?.timeStamp
      ) {
        console.error("Invalid message format", message);
        return;
      }

      console.log("Message received:", message);
      pub.publish("chat", JSON.stringify(message));
      // io.to(message.chatId).emit("receiveMessage", message);
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
