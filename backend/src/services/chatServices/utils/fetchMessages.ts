import { getChatMessages } from "@repositories/messageRepo";
import { IMessage } from "@models/Message";

export const fetchChatMessages = async (
  chatId: string,
  before?: number
): Promise<IMessage[]> => {
  const messages = await getChatMessages(chatId, before);

  return messages;
};
