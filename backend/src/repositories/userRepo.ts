import { User, IUser } from "../models/User";

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: email });

  return user;
};

export const createUser = async (
  userObj: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.create({
    username: userObj.username,
    password: userObj.password,
    email: userObj.email,
    friendList: [],
  });
  return user;
};
