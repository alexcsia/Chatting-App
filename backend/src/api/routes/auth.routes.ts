import { loginRequestSchema } from "./schemas/login.schema";
import { loginController } from "../controllers/login";
import { registerRequestSchema } from "./schemas/register.schema";
import { registerController } from "../controllers/register";
import { FastifyPluginAsync } from "fastify";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/login",
    { schema: { body: loginRequestSchema } },
    loginController
  );

  fastify.post(
    "/register",
    { schema: { body: registerRequestSchema } },
    registerController
  );
};
