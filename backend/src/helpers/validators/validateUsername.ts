import validator from "validator";
import { ApiError } from "../../api/errors/ApiError";

export const validateUsername = (username: string) => {
  const trimmedUsername = username.trim();

  if (!validator.isLength(trimmedUsername, { min: 3, max: 30 }))
    throw new ApiError(
      400,
      "Username must be between 3 and 30 characters long."
    );

  if (!validator.isAlphanumeric(trimmedUsername))
    throw new ApiError(400, "Username must be alphanumeric.");
};
