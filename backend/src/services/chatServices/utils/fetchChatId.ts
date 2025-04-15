import { getChatBetweenUsers } from "@repositories/chatRepo";
import { ApiError } from "@api/errors/ApiError";
import { returnUserIds } from "./helpers/returnUserIds";

export const fetchChatId = async (...usernames: string[]) => {
  const userIds = await returnUserIds(...usernames);

  if (userIds.length !== usernames.length) {
    throw new ApiError(404, "One or more users not found.");
  }

  const chat = await getChatBetweenUsers(userIds);
  if (!chat) throw new ApiError(404, "Chat not found");

  return chat._id;
};
