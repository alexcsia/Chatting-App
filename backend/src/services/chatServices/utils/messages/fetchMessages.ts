import { getChatMessages } from "@repositories/messageRepo";
import { IMessage } from "@models/Message";
import { isUserInChat } from "@repositories/chatRepo";
import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";

export const fetchChatMessages = async (
  chatId: string,
  username: string,
  before?: number
): Promise<IMessage[]> => {
  const user = await getUserByUsername(username);
  if (!user) throw new ApiError(404, "User not found");

  const userExists = await isUserInChat(user._id, chatId);
  if (!userExists) throw new ApiError(401, "Cannot access another user's chat");
  const messages = await getChatMessages(chatId, before);

  return messages;
};
