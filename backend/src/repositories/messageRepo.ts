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

export const getChatMessages = async (
  chatId: string,
  before?: number
): Promise<IMessage[]> => {
  const query: any = { chatId };

  if (before) {
    query.timeStamp = { $lt: before };
  }

  const messageList = await Message.find(query)
    .sort({ timeStamp: -1 })
    .limit(20);

  return messageList.reverse();
};
