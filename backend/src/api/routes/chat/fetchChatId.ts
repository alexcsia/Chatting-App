import { FastifyInstance } from "fastify";
import {
  fetchChatSchema,
  FetchChatQuery,
} from "../schemas/chat/fetchChat.schema";
import { fetchChatIdController } from "@api/controllers/chat/fetchChatId";

export const fetchChatIdRoute = (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: FetchChatQuery }>(
    "/fetch-chat",
    {
      schema: fetchChatSchema,
      onRequest: fastify.verifyJWT,
    },
    fetchChatIdController
  );
};
