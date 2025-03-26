import { getUserByUsername } from "@repositories/userRepo";

export const returnUserIds = async (
  ...usernames: string[]
): Promise<string[]> => {
  const users = await Promise.all(
    usernames.map((username) => getUserByUsername(username))
  );

  const userIds = users.filter((user) => user != null).map((user) => user!._id);

  return userIds;
};
