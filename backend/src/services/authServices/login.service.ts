import { ApiError } from "../../api/errors/ApiError";
import { getUserByEmail } from "../../repositories/userRepo";
import { comparePassword } from "../../helpers/passwordUtils";
import jwtUtils from "../../helpers/jwtUtils";

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new ApiError(401, "Email or password is incorrect");

  const isMatch = comparePassword(user.password, password);
  if (!isMatch) throw new ApiError(401, "Email or password is incorrect");

  const accessJwt = await jwtUtils.signJWT(user.username, user.email);

  const refreshJwt = await jwtUtils.signRefreshJWT(user.username, user.email);

  return { accessJwt, refreshJwt };
};
