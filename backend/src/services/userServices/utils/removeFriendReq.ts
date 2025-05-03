import { ApiError } from "@api/errors/ApiError";
import { getUserByUsername } from "@repositories/userRepo";
import { removeFromPendingRequests } from "@repositories/userRepo";
export const removeFriendRequest = async (
  requestingUsername: string,
  targetUsername: string
) => {
  const requester = await getUserByUsername(requestingUsername);
  if (!requester) throw new ApiError(404, "User not found");

  await removeFromPendingRequests(requester, targetUsername);
};
