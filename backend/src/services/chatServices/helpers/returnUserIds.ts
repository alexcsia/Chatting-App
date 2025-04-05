import { getUserByUsername } from "@repositories/userRepo";
import { IUser } from "@models/User";

export const returnUserIds = async (
  ...usernames: string[]
): Promise<string[]> => {
  const users = await Promise.all(
    usernames.map((username) => getUserByUsername(username))
  );

  const userIds = users
    .filter((user): user is IUser => user != null)
    .map((user) => user._id);

  return userIds;
};
