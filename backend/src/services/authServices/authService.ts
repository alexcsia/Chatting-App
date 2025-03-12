import { registerUser } from "./registerUser";
import { authenticateUser } from "./authenticateUser";
import { FastifyInstance } from "fastify";
import { generateAuthenticationTokens } from "./generateTokens";

export type AuthServiceType = ReturnType<typeof authService>;

export const authService = (fastify?: FastifyInstance) => ({
  authenticateUser,
  generateAuthenticationTokens: (
    user: {
      username: string;
      email: string;
      userId: string;
    },
    options: { refreshToken: boolean }
  ) => {
    if (!fastify) {
      throw new Error("Fastify instance is required for generateTokens");
    }
    return generateAuthenticationTokens(fastify, user, options);
  },
  registerUser,
});
