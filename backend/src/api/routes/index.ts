import { authRoutes } from "./authRoutes";
import { chatRoutes } from "./chatRoutes";
import { FastifyInstance } from "fastify";
import { userRoutes } from "./userRoutes";

export default async function apiRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(chatRoutes, { prefix: "/chats" });
}
