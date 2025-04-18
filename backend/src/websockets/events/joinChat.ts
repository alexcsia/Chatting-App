import { Socket } from "socket.io";

export function joinChat(
  socket: Socket,
  activeChats: Map<string, Set<string>>
) {
  return (chatId: string) => {
    socket.join(chatId);
    socket.data.chatId = chatId;
    if (!activeChats.get(chatId)) {
      activeChats.set(chatId, new Set());
    }
    activeChats.get(chatId)?.add(socket.id);

    console.log(`User ${socket.id} joined chat ${chatId}`);
  };
}
