import { FastifyInstance } from "fastify";
import { newMessageSchema } from "../../schemas/chat/messages/newMessage.schema";
import { createMessageController } from "@api/controllers/chat/messages/createMessage";

export const createMessageRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/:chatId/messages",
    {
      schema: newMessageSchema,
      onRequest: [fastify.verifyJWT],
    },
    createMessageController
  );
};
