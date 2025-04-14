import { FastifyInstance } from "fastify";
import { loginRequestSchema } from "../schemas/auth/login.schema";
import { loginController } from "@api/controllers/auth/login";
import { authService } from "@services/authServices/authService";

export const loginRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/login",
    { schema: { body: loginRequestSchema } },
    loginController(authService(fastify))
  );
};
