import { User, IUser } from "@models/User";

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: email });

  return user;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser | null> => {
  const user = await User.create({
    username: username,
    password: password,
    email: email,
    friendList: [],
  });
  return user;
};

export const getUserByID = async (userId: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: userId });

  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  const user = await User.findOne({ username: username });
  return user as IUser;
};

export const addToFriendList = async (
  requestingUser: IUser,
  usernameToAdd: string
) => {
  await User.updateOne(
    { username: requestingUser.username },
    { $addToSet: { friendList: usernameToAdd } }
  );
};

export const findMatchingUsers = async (username: string) => {
  const users = await User.find({
    $or: [
      { username: username },
      { username: { $regex: username, $options: "i" } },
    ],
  }).select("username -_id");

  return users;
};
