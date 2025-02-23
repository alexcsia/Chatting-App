import { loginRequestSchema } from "./schemas/login.schema";
import { loginUser } from "../controllers/login";
import { registerRequestSchema } from "./schemas/register.schema";
import { registerUser } from "../controllers/register";
import { FastifyPluginAsync } from "fastify";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/login", { schema: { body: loginRequestSchema } }, loginUser);

  fastify.post(
    "/register",
    { schema: { body: registerRequestSchema } },
    registerUser
  );
};
