import { getUserByUsername } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";
import { addPendingRequest } from "@repositories/userRepo";

export const sendFriendRequest = async (
  requestingUsername: string,
  receivingUsername: string
) => {
  const requestingUser = await getUserByUsername(requestingUsername);
  if (!requestingUser) {
    console.log("requestingUser not found");
    throw new ApiError(404, "User not found");
  }

  const receivingUser = await getUserByUsername(receivingUsername);
  if (!receivingUser) {
    console.log("receiving user not found");
    throw new ApiError(404, "User not found");
  }

  const alreadyRequested = receivingUser.pendingFriendRequests.includes(
    requestingUser.username
  );
  if (alreadyRequested) {
    throw new ApiError(400, "Friend request already sent");
  }

  await addPendingRequest(requestingUser, receivingUser);
};
