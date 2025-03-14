import { ApiError } from "@api/errors/ApiError";
import { getUserByUsername } from "@repositories/userRepo";
import { newChat } from "@repositories/chatRepo";

export const createChat = async (
  requestingUsername: string,
  targetUsername: string
) => {
  const requestingUser = await getUserByUsername(requestingUsername);
  const targetUser = await getUserByUsername(targetUsername);

  if (!requestingUser || !targetUser) {
    throw new ApiError(404, "User(s) not found");
  }

  const chat = await newChat([requestingUser._id, targetUser._id]);

  return chat;
};
