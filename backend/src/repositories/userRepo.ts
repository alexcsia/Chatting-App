import { UserDocument, User } from "../models/user";

export const getUserByEmail = async (
  email: string
): Promise<UserDocument | null> => {
  const user = await User.findOne({ email: email });

  return user;
};
