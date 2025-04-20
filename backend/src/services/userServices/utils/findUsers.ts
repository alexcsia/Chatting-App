import { ApiError } from "@api/errors/ApiError";
import { findMatchingUsers } from "@repositories/userRepo";
import validators from "@services/validators";

export const findUsers = async (username: string) => {
  await validators.validateUsername(username);

  const userList = await findMatchingUsers(username);
  if (!userList) throw new ApiError(404, "No users found");
};
