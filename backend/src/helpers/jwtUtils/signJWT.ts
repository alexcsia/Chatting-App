import jwt from "jsonwebtoken";
import { ApiError } from "../../api/errors/ApiError";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new ApiError(500, "JWT Secret not defined");

export const signJWT = (username: string, email: string): string => {
  try {
    const token = jwt.sign({ username: username, email: email }, JWT_SECRET, {
      expiresIn: "15m",
      algorithm: "ES256",
    });
    return token;
  } catch (error: unknown) {
    throw new ApiError(500, "Failed to sign access token");
  }
};
