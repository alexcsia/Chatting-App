import validator from "validator";
import { isEmailUnique } from "../../services/user/register.user";
import { ApiError } from "../../api/errors/ApiError";

export const validateEmail = async (email: string): Promise<string> => {
  const trimmedEmail = email.trim();

  if (!validator.isLength(trimmedEmail, { min: 5, max: 254 })) {
    throw new ApiError(400, "Email must be between 5 and 254 characters long");
  }

  if (!validator.isEmail(trimmedEmail)) {
    throw new ApiError(400, "Invalid email format");
  }

  const normalizedEmail =
    validator.normalizeEmail(trimmedEmail) || trimmedEmail;

  const isUnique = await isEmailUnique(normalizedEmail);
  if (!isUnique) throw new ApiError(400, "Email is already in use");

  return normalizedEmail;
};
