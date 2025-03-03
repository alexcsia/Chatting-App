import { ApiError } from "@api/errors/ApiError";
import { FastifyInstance } from "fastify";

export const verifyJWT = async (fastify: FastifyInstance, token: string) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new ApiError(500, "JWT Secret not defined");

    return await fastify.verifyJWT(token);
  } catch (error: unknown) {
    console.log(error);
    throw new ApiError(500, "Failed to verify JWT");
  }
};
