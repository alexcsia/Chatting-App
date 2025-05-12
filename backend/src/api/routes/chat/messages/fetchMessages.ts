import { FastifyInstance } from "fastify";
import { fetchChatMessagesController } from "@api/controllers/chat/messages/fetchMessages";
import { fetchMessagesSchema } from "../../schemas/chat/messages/fetchMessages.schema";

export const fetchMessagesRoute = (fastify: FastifyInstance) => {
  fastify.get(
    "/:chatId/messages",
    {
      schema: fetchMessagesSchema,
      onRequest: [fastify.verifyJWT],
    },
    fetchChatMessagesController
  );
};
