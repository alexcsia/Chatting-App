import { FastifyInstance } from "fastify";
import { loginRequestSchema } from "./schemas/login.schema";
import { loginUser } from "../controllers/login";

export default async function login(fastify: FastifyInstance) {
  fastify.post("/login", { schema: { body: loginRequestSchema } }, loginUser);
}
