import { Chat, IChat } from "../models/Chat";

export const newChat = async (userIds: string[]): Promise<IChat> => {
  const chat = await Chat.create({ userIds });
  return chat;
};
