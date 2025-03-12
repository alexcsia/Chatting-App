import { hashPassword } from "./helpers/passwordUtils";
import validators from "./helpers/validators";
import { createUser } from "@repositories/userRepo";
import { ApiError } from "@api/errors/ApiError";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  await validators.validateUsername(username);
  await validators.validateEmail(email);
  validators.validatePassword(password);

  const hashedPassword = await hashPassword(password);

  // add sanitization
  await createUser(username, email, hashedPassword);
};
