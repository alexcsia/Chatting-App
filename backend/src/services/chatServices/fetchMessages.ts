import { getChatMessages } from "@repositories/messageRepo";
import { decodeContent } from "./helpers/decodeSanitizedMessage";

export const fetchChatMessages = async (chatId: string) => {
  const messages = await getChatMessages(chatId);

  //   const decodedMessages = messages;
  const decodedMessages = messages.map((message) => {
    return decodeContent(message.content);
  });

  return decodedMessages;
};
