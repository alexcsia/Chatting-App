import jwt from "jsonwebtoken";
import { ApiError } from "@api/errors/ApiError";

export const signRefreshJWT = async (userId: string): Promise<string> => {
  try {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESHJWT_SECRET not defined");
    const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
      algorithm: "HS384",
    });
    return refreshToken;
  } catch (error: unknown) {
    console.log(error);
    throw new ApiError(500, "Failed to sign refresh token");
  }
};
