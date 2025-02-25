import { hashPassword } from "../../helpers/passwordUtils";
import validators from "../../helpers/validators";
import { createUser } from "../../repositories/userRepo";
import { ApiError } from "../../api/errors/ApiError";
import { createUserObject } from "../../helpers/userHelpers";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    validators.validateUsername(username);
    validators.validateEmail(email);
    validators.validatePassword(password);

    const hashedPassword = await hashPassword(password);

    const userObj = createUserObject(username, email, hashedPassword);

    // add sanitization
    await createUser(userObj);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return error;
    }
  }
};
