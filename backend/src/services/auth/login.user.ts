import { ApiError } from "../../api/errors/ApiError";
import { getUserByEmail } from "../../repositories/userRepo";

export const loginUser = async (email: string, password: string) => {
  const user = getUserByEmail(email);
  if (!user) throw new ApiError(401, "Email or password is incorrect");

  const isMatch = comparePassword(user.password, password);
  if (!isMatch) throw new ApiError(401, "Email or password is incorrect");
};
