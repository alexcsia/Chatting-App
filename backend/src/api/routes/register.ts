import { FastifyInstance } from "fastify";
import { registerUserSchema } from "./schemas/registerUser.schema";
import { registerUser } from "../controllers/register";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/register",
    { schema: { body: registerUserSchema } },
    registerUser
  );
}
