import { ApiError } from "@api/errors/ApiError";
import { findMatchingUsers } from "@repositories/userRepo";
import { validateUsername } from "../helpers/validators/validateUsername";

export const findUsers = async (username: string) => {
  validateUsername(username);

  const userList = await findMatchingUsers(username);
  if (!userList) throw new ApiError(404, "No users found");

  return userList;
};
