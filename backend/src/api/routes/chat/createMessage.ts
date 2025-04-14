import { FastifyInstance } from "fastify";
import { newMessageSchema } from "../schemas/chat/newMessage.schema";
import { createMessageController } from "@api/controllers/chat/createMessage";

export const createMessageRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/new-message/:chatId",
    {
      schema: newMessageSchema,
      onRequest: [fastify.verifyJWT],
    },
    createMessageController
  );
};
