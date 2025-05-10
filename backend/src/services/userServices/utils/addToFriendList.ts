import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";
import { addToFriendList } from "@repositories/userRepo";
import { removeFriendRequest } from "./removeFriendReq";
export const addUserToFriendList = async (
  requestingUsername: string,
  targetUsername: string
) => {
  if (requestingUsername === targetUsername) {
    throw new ApiError(409, "Cannot add yourself to friendlist");
  }

  const requester = await getUserByUsername(requestingUsername);
  const receiver = await getUserByUsername(targetUsername);

  if (!receiver || !requester) {
    throw new ApiError(404, "User not found");
  }

  if (!receiver.friendList.includes(requester.username)) {
    await addToFriendList(receiver, requester.username);
  }
  if (!requester.friendList.includes(receiver.username)) {
    await addToFriendList(requester, receiver.username);
  }
  await removeFriendRequest(requestingUsername, targetUsername);
};
