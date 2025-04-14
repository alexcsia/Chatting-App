import { FastifyInstance } from "fastify";
import { registerRequestSchema } from "../schemas/auth/register.schema";
import { registerController } from "@api/controllers/auth/register";
import { authService } from "@services/authServices/authService";

export const registerRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/register",
    { schema: { body: registerRequestSchema } },
    registerController(authService())
  );
};
