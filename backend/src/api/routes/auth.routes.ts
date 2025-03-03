import { loginRequestSchema } from "./schemas/login.schema";
import { loginController } from "@api/controllers/login";
import { registerRequestSchema } from "./schemas/register.schema";
import { registerController } from "@api/controllers/register";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authService } from "@services/authServices/authService";

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
};
