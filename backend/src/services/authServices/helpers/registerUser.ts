import { hashPassword } from "./passwordUtils";
import validators from "./validators";
import { createUser } from "../../../repositories/userRepo";
import { ApiError } from "../../../api/errors/ApiError";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    validators.validateUsername(username);
    await validators.validateEmail(email);
    validators.validatePassword(password);

    const hashedPassword = await hashPassword(password);

    // add sanitization
    await createUser(username, email, hashedPassword);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "An unexpected error occurred");
    }
  }
};
