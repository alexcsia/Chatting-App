import { FastifyInstance } from "fastify";
import { fetchChatMessagesController } from "@api/controllers/chat/fetchMessages";
import { fetchMessagesSchema } from "../schemas/chat/fetchMessages.schema";

export const fetchMessagesRoute = (fastify: FastifyInstance) => {
  fastify.get(
    "/fetch-messages/:chatId",
    {
      schema: fetchMessagesSchema,
      onRequest: [fastify.verifyJWT],
    },
    fetchChatMessagesController
  );
};
