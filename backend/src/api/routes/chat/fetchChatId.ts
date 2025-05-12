import { FastifyInstance } from "fastify";
import {
  fetchChatSchema,
  FetchChatParams,
} from "../schemas/chat/fetchChat.schema";
import { fetchChatIdController } from "@api/controllers/chat/fetchChatId";

export const fetchChatIdRoute = (fastify: FastifyInstance) => {
  fastify.get<{ Params: FetchChatParams }>(
    "/with/:username",
    {
      schema: fetchChatSchema,
      onRequest: fastify.verifyJWT,
    },
    fetchChatIdController
  );
};
