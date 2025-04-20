import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";
import { addToFriendList } from "@repositories/userRepo";

export const addUserToFriendList = async (
  requestingUser: string,
  usernameToAdd: string
) => {
  const user = await getUserByUsername(requestingUser);
  if (!user) throw new ApiError(404, "User not found");

  if (user.username === usernameToAdd)
    throw new ApiError(400, "Cannot add yourself to friendlist");

  await addToFriendList(user, usernameToAdd);
};
