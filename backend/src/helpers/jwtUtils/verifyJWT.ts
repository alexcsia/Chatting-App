import { ApiError } from "@api/errors/ApiError";
import { FastifyInstance } from "fastify";

interface JWTPayload {
  email: string;
  userId: string;
}

export const verifyJWT = async (
  fastify: FastifyInstance,
  token: string
): Promise<JWTPayload> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT Secret not defined");

    const decoded = (await fastify.verifyJWT(token)) as JWTPayload;

    return decoded;
  } catch (error: unknown) {
    console.log(error);
    throw new ApiError(500, "Failed to verify JWT");
  }
};
