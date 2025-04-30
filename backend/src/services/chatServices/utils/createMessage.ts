import { saveMessage } from "@repositories/messageRepo";

export const createMessage = async (
  authorUsername: string,
  content: string,
  chatId: string
) => {
  const message = await saveMessage(authorUsername, content, chatId);

  return message;
};
