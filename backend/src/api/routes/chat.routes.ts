import { createChatController } from "@api/controllers/createChat";
import { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";
import { newChatSchema } from "./schemas/newChat.schema";
import { fetchUserChats } from "@api/controllers/fetchChats";
import { fetchChatSchema } from "./schemas/fetchChat.schema";

export const chatRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.post(
    "/new-chat",
    {
      schema: newChatSchema,
      onRequest: [fastify.verifyJWT],
    },
    createChatController
  );

  fastify.get(
    "/fetch-chats",
    { schema: fetchChatSchema, onRequest: [fastify.verifyJWT] },
    fetchUserChats
  );
};
