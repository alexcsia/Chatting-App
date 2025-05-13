import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";
import { addPendingRequest } from "@repositories/userRepo";
import { addToPending, checkIfOnline } from "redisDb/cache/sseCache";
import { publishEvent } from "redisDb/pub/pub";
import { constructPayload } from "../helpers/sse/constructPayload";

export const sendFriendRequest = async (
  requestingUsername: string,
  receivingUsername: string
) => {
  if (receivingUsername === requestingUsername)
    throw new ApiError(400, "Cannot send yourself a friend request");

  const requestingUser = await getUserByUsername(requestingUsername);
  if (!requestingUser) {
    throw new ApiError(404, "User not found");
  }

  const receivingUser = await getUserByUsername(receivingUsername);
  if (!receivingUser) {
    throw new ApiError(404, "User not found");
  }

  const alreadyRequested = receivingUser.pendingFriendRequests.includes(
    requestingUser.username
  );
  if (alreadyRequested) {
    throw new ApiError(400, "Friend request already sent");
  }

  const alreadyFriend = receivingUser.friendList.includes(
    requestingUser.username
  );
  if (alreadyFriend) {
    throw new ApiError(400, "Already friends");
  }

  await addPendingRequest(requestingUser, receivingUser);

  const isOnline = await checkIfOnline(receivingUsername);
  const payload = constructPayload("friendRequestReceived", requestingUsername);

  if (isOnline) {
    await publishEvent(receivingUsername, payload);
  } else {
    await addToPending(receivingUsername, payload);
  }
};
