import { Socket } from "socket.io";

export function joinChat(socket: Socket, activeChats: Set<string>) {
  return (chatId: string) => {
    socket.join(chatId);
    socket.data.chatId = chatId;
    activeChats.add(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  };
}
