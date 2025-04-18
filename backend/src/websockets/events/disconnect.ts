import { Socket } from "socket.io";

export function disconnect(
  socket: Socket,
  activeChats: Map<string, Set<string>>
) {
  return () => {
    console.log(`User disconnected: ${socket.id}`);
    const chatId = socket.data.chatId;

    if (chatId && activeChats.has(chatId)) {
      const sockets = activeChats.get(chatId);
      sockets?.delete(socket.id);

      if (sockets?.size === 0) {
        activeChats.delete(chatId);
        console.log(`removed ${chatId} from active chats`);
      }
    }
  };
}
