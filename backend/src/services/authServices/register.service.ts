import { hashPassword } from "../../helpers/passwordUtils";
import validators from "../../helpers/validators";
import { createUser } from "../../repositories/userRepo";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  validators.validateUsername(username);
  validators.validateEmail(email);
  validators.validatePassword(password);

  const hashedPassword = await hashPassword(password);
  // add sanitization

  createUser(username, hashedPassword, email);
};
