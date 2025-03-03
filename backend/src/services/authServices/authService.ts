import { registerUser } from "./register.service";
import { verifyUserCredentials } from "./helpers/authenticateUser";
import { FastifyInstance } from "fastify";
import { generateTokens } from "./helpers/generateTokens";

export type AuthServiceType = ReturnType<typeof authService>;

export const authService = (fastify: FastifyInstance) => ({
  verifyUserCredentials,
  generateTokens: (user: { username: string; email: string }) =>
    generateTokens(fastify, user),
});
