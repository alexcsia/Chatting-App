import { registerUser } from "./helpers/registerUser";
import { authenticateUser } from "./helpers/authenticateUser";
import { FastifyInstance } from "fastify";
import { generateTokens } from "./helpers/generateTokens";

export type AuthServiceType = ReturnType<typeof authService>;

export const authService = (fastify?: FastifyInstance) => ({
  authenticateUser,
  generateTokens: (user: { username: string; email: string }) => {
    if (!fastify) {
      throw new Error("Fastify instance is required for generateTokens");
    }
    return generateTokens(fastify, user);
  },
  registerUser,
});
