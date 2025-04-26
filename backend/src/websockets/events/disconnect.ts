import { Socket } from "socket.io";
import { FastifyInstance } from "fastify";

export function disconnect(
  socket: Socket,
  activeChats: Map<string, Set<string>>,
  fastify: FastifyInstance
) {
  return () => {
    try {
      console.log(`user disconnected: ${socket.id}`);
      fastify.log.info(`user disconnected: ${socket.id}`);
      const chatId = socket.data.chatId;

      if (chatId && activeChats.has(chatId)) {
        const sockets = activeChats.get(chatId);
        sockets?.delete(socket.id);

        if (sockets?.size === 0) {
          activeChats.delete(chatId);
          fastify.log.debug(`removed ${chatId} from active chats`);
        }
      }
    } catch (error) {
      fastify.log.error({ err: error }, "error in disconnect");
    }
  };
}
