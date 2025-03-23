import { authRoutes } from "./auth.routes";
import { chatRoutes } from "./chat.routes";
import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes";

export default async function apiRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(chatRoutes, { prefix: "/chats" });
}
