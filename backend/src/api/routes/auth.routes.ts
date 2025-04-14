import { loginRequestSchema } from "./schemas/login.schema";
import { loginController } from "../controllers/auth/login";
import { registerRequestSchema } from "./schemas/register.schema";
import { registerController } from "../controllers/auth/register";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authService } from "@services/authServices/authService";
import { refreshToken } from "@api/controllers/auth/refreshToken";

export const authRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.post(
    "/login",
    { schema: { body: loginRequestSchema } },
    loginController(authService(fastify))
  );
  fastify.post(
    "/register",
    { schema: { body: registerRequestSchema } },
    registerController(authService())
  );

  fastify.get(
    "/refresh-token",
    { onRequest: [fastify.verifyRefreshJWT] },
    refreshToken(authService(fastify))
  );
};
