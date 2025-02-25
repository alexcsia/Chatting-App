import { UserDocument, User } from "../models/User";

export const getUserByEmail = async (
  email: string
): Promise<UserDocument | null> => {
  const user = await User.findOne({ email: email });

  return user;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<UserDocument | null> => {
  console.log("create");
  const user = await User.create({
    username: username,
    password: password,
    email: email,
    friendList: [],
  });
  return user;
};
