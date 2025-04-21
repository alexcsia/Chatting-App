import { ApiError } from "@api/errors/ApiError";
import validator from "validator";

export const validatePassword = async (password: string) => {
  const isStrong = validator.isStrongPassword(password, {
    minLength: 10,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 2,
    minSymbols: 2,
  });
  if (!isStrong)
    throw new ApiError(
      400,
      "Password must contain at least 10 characters, 2 lowercase, 2 uppercase, 2 numbers, 2 symbols"
    );
};
