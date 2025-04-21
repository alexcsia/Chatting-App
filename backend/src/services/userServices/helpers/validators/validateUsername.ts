import validator from "validator";
import { ApiError } from "@api/errors/ApiError";

export const validateUsername = (username: string) => {
  const trimmedUsername = validator.trim(username);

  if (!validator.isAlphanumeric(trimmedUsername))
    throw new ApiError(400, "Username must be alphanumeric.");

  if (!validator.isLength(trimmedUsername, { min: 1, max: 30 }))
    throw new ApiError(400, "Username must be between 1 and 30");
};
