import { FastifyInstance } from "fastify";
import { IMessage } from "@models/Message";
import { updateCachedMessages } from "redisDb/cache/messageCache";
import { Server } from "socket.io";

export function receiveMessage(
  io: Server,
  activeChats: Map<string, Set<string>>,
  fastify: FastifyInstance
) {
  return async (message: IMessage) => {
    try {
      if (activeChats.has(message.chatId)) {
        io.to(message.chatId).emit("receiveMessage", message);
        await updateCachedMessages(message.chatId, message);
      }
    } catch (err) {
      fastify.log.error({ err, message }, "error when receiving redis pubsub");
    }
  };
}
