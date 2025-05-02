import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";
import { addToFriendList } from "@repositories/userRepo";
export const addUserToFriendList = async (
  requestingUsername: string,
  usernameToAdd: string
) => {
  if (requestingUsername === usernameToAdd) {
    throw new ApiError(409, "Cannot add yourself to friendlist");
  }

  const requestingUser = await getUserByUsername(requestingUsername);
  if (!requestingUser) {
    throw new ApiError(404, "User not found");
  }

  const friendUser = await getUserByUsername(usernameToAdd);
  if (!friendUser) {
    throw new ApiError(404, "User not found");
  }

  await addToFriendList(requestingUser, usernameToAdd);
};
