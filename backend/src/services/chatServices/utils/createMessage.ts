import { saveMessage } from "@repositories/messageRepo";
import { sanitizeMessage } from "./helpers/sanitizeMessageContent";

export const createMessage = async (
  authorUsername: string,
  content: string,
  chatId: string
) => {
  const sanitizedContent = sanitizeMessage(content);
  const message = await saveMessage(authorUsername, sanitizedContent, chatId);

  return message;
};
