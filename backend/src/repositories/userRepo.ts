import { User, IUser } from "../models/User";

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
