import { getChatMessages } from "@repositories/messageRepo";

export const fetchChatMessages = async (chatId: string) => {
  const messages = await getChatMessages(chatId);

  //sanitize

  return messages;
};
