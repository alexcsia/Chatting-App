import { FastifyInstance } from "fastify";
import { fetchUserChatsController } from "@api/controllers/chat/fetchChats";
import { basicAuthSchema } from "../schemas/auth/basicAuth.schema";

export const fetchChatsRoute = (fastify: FastifyInstance) => {
  fastify.get(
    "/fetch-chats",
    {
      schema: basicAuthSchema,
      onRequest: [fastify.verifyJWT],
    },
    fetchUserChatsController
  );
};
