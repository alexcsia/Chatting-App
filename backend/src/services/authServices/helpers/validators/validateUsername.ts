import validator from "validator";
import { ApiError } from "@api/errors/ApiError";
import { getUserByUsername } from "@repositories/userRepo";

export const validateUsername = async (username: string) => {
  const trimmedUsername = username.trim();

  if (!validator.isLength(trimmedUsername, { min: 3, max: 30 }))
    throw new ApiError(
      400,
      "Username must be between 3 and 30 characters long."
    );

  if (!validator.isAlphanumeric(trimmedUsername))
    throw new ApiError(400, "Username must be alphanumeric.");

  const foundUser = await getUserByUsername(trimmedUsername);
  if (foundUser) throw new ApiError(400, "Username is already in use");
};
