import { FastifyInstance } from "fastify";
import { Socket } from "socket.io";

export function joinChat(
  socket: Socket,
  activeChats: Map<string, Set<string>>,
  fastify: FastifyInstance
) {
  return (chatId: string) => {
    try {
      socket.join(chatId);
      socket.data.chatId = chatId;

      if (!activeChats.get(chatId)) {
        activeChats.set(chatId, new Set());
      }
      activeChats.get(chatId)?.add(socket.id);

      fastify.log.info(`user ${socket.id} joined chat ${chatId}`);
      console.log(`user ${socket.id} joined chat ${chatId}`);
    } catch (err) {
      fastify.log.error({ err }, "error in joinChat");
    }
  };
}
