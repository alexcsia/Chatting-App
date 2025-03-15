import { Chat, IChat } from "@models/Chat";

export const newChat = async (userIds: string[]): Promise<IChat> => {
  const chat = await Chat.create({ userIds });
  return chat;
};

export const getUserChats = async (userId: string): Promise<IChat[]> => {
  const chatList = await Chat.find({ userIds: { $in: [userId] } });

  return chatList;
};
