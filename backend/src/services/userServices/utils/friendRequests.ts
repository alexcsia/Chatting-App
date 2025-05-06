import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";
import { addPendingRequest } from "@repositories/userRepo";
import { cache, pub } from "redisDb";

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

  await addPendingRequest(requestingUser, receivingUser);

  const isOnline = await cache.sIsMember("online-users", receivingUsername);

  const payload = {
    event: "friendRequestReceived",
    data: {
      from: requestingUser.username,
    },
  };

  if (isOnline) {
    await pub.publish(`sse:${receivingUsername}`, JSON.stringify(payload));
  } else {
    await cache.rPush(
      `pending-requests:${receivingUsername}`,
      JSON.stringify(payload)
    );
  }
};
