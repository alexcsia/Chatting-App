import jwt from "jsonwebtoken";
import { ApiError } from "../../api/errors/ApiError";

export const signRefreshJWT = async (
  username: string,
  email: string
): Promise<string> => {
  try {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if (!REFRESH_TOKEN_SECRET)
      throw new ApiError(500, "REFRESHJWT_SECRET not defined");

    const refreshToken = jwt.sign(
      { username: username, email: email },
      REFRESH_TOKEN_SECRET || "asa",
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );
    return refreshToken;
  } catch (error: unknown) {
    console.log(error);
    throw new ApiError(500, "Failed to sign refresh token");
  }
};
