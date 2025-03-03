import { ApiError } from "../../../api/errors/ApiError";
import { getUserByEmail } from "../../../repositories/userRepo";
import { comparePassword } from "../../../helpers/passwordUtils";

export const authenticateUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new ApiError(401, "Email or password is incorrect");

  const isMatch = comparePassword(user.password, password);
  if (!isMatch) throw new ApiError(401, "Email or password is incorrect");

  return { email: user.email, username: user.username };
};
