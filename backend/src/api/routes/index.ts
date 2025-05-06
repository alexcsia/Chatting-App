import { authRoutes } from "./authRoutes";
import { chatRoutes } from "./chatRoutes";
import { FastifyInstance } from "fastify";
import { userRoutes } from "./userRoutes";
import { sseRoutes } from "./sseRoutes";

export default async function apiRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(chatRoutes, { prefix: "/chats" });
  fastify.register(sseRoutes, { prefix: "/sse" });
}
