import { newChatController } from "@api/controllers/newChat";
import { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";
import { newChatSchema } from "./schemas/newChat.schema";

export const chatRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.post(
    "/new-chat",
    {
      schema: newChatSchema,
      onRequest: [fastify.verifyJWT],
    },
    newChatController
  );
};
