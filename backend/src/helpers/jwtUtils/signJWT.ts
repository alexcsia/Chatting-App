import jwt from "jsonwebtoken";
import { ApiError } from "../../api/errors/ApiError";

export const signJWT = async (
  username: string,
  email: string
): Promise<string> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new ApiError(500, "JWT Secret not defined");

    const token = jwt.sign({ username: username, email: email }, JWT_SECRET, {
      expiresIn: "15m",
      algorithm: "HS256", //symmetric key encryption
    });
    return token;
  } catch (error: unknown) {
    console.log(error);
    throw new ApiError(500, "Failed to sign access token");
  }
};
