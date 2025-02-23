import { FastifyInstance } from "fastify";
import { registerRequestSchema } from "./schemas/register.schema";
import { registerUser } from "../controllers/register";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/register",
    { schema: { body: registerRequestSchema } },
    registerUser
  );
}
