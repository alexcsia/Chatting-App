import validators from "../../helpers/validators";
import { User } from "../../models/user";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  validators.validateUsername(username);
  validators.validateEmail(email);
  validators.validatePassword(password);
};

export const isEmailUnique = async (email: string) => {
  const existingUser = await User.findOne({ email: email });
  return !existingUser;
};
