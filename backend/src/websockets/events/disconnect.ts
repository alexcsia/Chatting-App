import { Socket } from "socket.io";

export function disconnect(socket: Socket, activeChats: Set<string>) {
  return () => {
    console.log(`User disconnected: ${socket.id}`);
    const chatId = socket.data.chatId;
    console.log(socket.data);
    if (chatId) {
      activeChats.delete(chatId);
      console.log("removed from active chats:", chatId);
    }
  };
}
