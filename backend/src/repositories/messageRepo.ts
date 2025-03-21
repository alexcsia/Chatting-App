import { Message, IMessage } from "@models/Message";

export const saveMessage = async (
  authorUsername: string,
  content: string,
  chatId: string
) => {
  const newMessage = await Message.create({
    authorUsername: authorUsername,
    content: content,
    chatId: chatId,
    timeStamp: Date.now(),
  });

  return newMessage;
};

export const getChatMessages = async (chatId: string): Promise<IMessage[]> => {
  const messageList = await Message.find({ chatId: chatId });

  return messageList;
};
