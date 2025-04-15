import { ApiError } from "@api/errors/ApiError";
import { getUserChats } from "@repositories/chatRepo";
import { getUserByUsername } from "@repositories/userRepo";

export const fetchChatIds = async (username: string) => {
  const user = await getUserByUsername(username);
  if (!user) throw new ApiError(404, "User not found");

  const chatList = await getUserChats(user._id);

  const chatIds = chatList.map((chat) => chat._id);
  return chatIds;
};
