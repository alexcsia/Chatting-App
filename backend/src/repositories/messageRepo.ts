import { Message } from "@models/Message";

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
