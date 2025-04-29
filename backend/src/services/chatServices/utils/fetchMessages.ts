import { getChatMessages } from "@repositories/messageRepo";
import { decodeContent } from "../helpers/decodeSanitizedMessage";
import { IMessage } from "@models/Message";

export const fetchChatMessages = async (
  chatId: string,
  before?: number
): Promise<IMessage[]> => {
  const messages = await getChatMessages(chatId, before);

  const decodedMessages = messages.map((message) => {
    const messageObject = message.toObject();
    return {
      ...messageObject,
      content: decodeContent(message.content),
    };
  });

  return decodedMessages;
};
