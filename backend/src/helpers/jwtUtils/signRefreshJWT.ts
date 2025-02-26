import jwt from "jsonwebtoken";
import { ApiError } from "../../api/errors/ApiError";

const REFRESHJWT_SECRET = process.env.REFRESHJWT_SECRET;
if (!REFRESHJWT_SECRET)
  throw new ApiError(500, "REFRESHJWT_SECRET not defined");

export const signRefreshJWT = (username: string, email: string): string => {
  try {
    const refreshToken = jwt.sign(
      { username: username, email: email },
      REFRESHJWT_SECRET,
      {
        expiresIn: "7d",
        algorithm: "ES256",
      }
    );
    return refreshToken;
  } catch (error: unknown) {
    throw new ApiError(500, "Failed to sign refresh token");
  }
};
