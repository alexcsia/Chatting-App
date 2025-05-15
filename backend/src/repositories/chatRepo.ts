import { Chat, IChat } from "@models/Chat";

export const newChat = async (userIds: string[]): Promise<IChat> => {
  const chat = await Chat.create({ userIds });
  return chat;
};

export const getUserChats = async (userId: string): Promise<IChat[]> => {
  const chatList = await Chat.find({ userIds: { $in: [userId] } });

  return chatList;
};

export const getChatBetweenUsers = async (
  userIds: string[]
): Promise<IChat | null> => {
  const chat = await Chat.findOne({
    userIds: { $all: userIds, $size: userIds.length },
  });

  return chat;
};

export const isUserInChat = async (userId: string, chatId: string) => {
  const chat = await Chat.findOne({ _id: chatId, users: userId });

  return !!chat;
};
