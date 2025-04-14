import { FastifyInstance } from "fastify";
import { createChatController } from "@api/controllers/chat/createChat";
import { newChatSchema } from "../schemas/chat/newChat.schema";

export const createChatRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/new-chat",
    {
      schema: newChatSchema,
      onRequest: [fastify.verifyJWT],
    },
    createChatController
  );
};
