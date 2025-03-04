import { FastifyInstance } from "fastify";
import { ApiError } from "@api/errors/ApiError";

export const signJWT = async (
  username: string,
  email: string,
  fastify: FastifyInstance
): Promise<string> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT Secret not defined");

    return await fastify.signJWT(username, email);
  } catch (error: unknown) {
    console.log(error);
    throw new ApiError(500, "Failed to sign access token");
  }
};
