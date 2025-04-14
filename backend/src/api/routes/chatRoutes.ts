import { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";
import chat from "./chat";

export const chatRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  chat.createChatRoute(fastify);
  chat.createMessageRoute(fastify);
  chat.fetchChatIdRoute(fastify);
  chat.fetchChatsRoute(fastify);
  chat.fetchMessagesRoute(fastify);
};
