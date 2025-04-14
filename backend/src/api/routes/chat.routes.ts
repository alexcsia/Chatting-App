import { createChatController } from "@api/controllers/chat/createChat";
import { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";
import { newChatSchema } from "./schemas/chat/newChat.schema";
import { fetchUserChatsController } from "@api/controllers/chat/fetchChats";
import { basicAuthSchema } from "./schemas/auth/basicAuth.schema";
import { createMessageController } from "@api/controllers/chat/createMessage";
import { newMessageSchema } from "./schemas/chat/newMessage.schema";
import { fetchMessagesSchema } from "./schemas/chat/fetchMessages.schema";
import { fetchChatMessagesController } from "@api/controllers/chat/fetchMessages";
import {
  FetchChatQuery,
  fetchChatSchema,
} from "./schemas/chat/fetchChat.schema";
import { fetchChatIdController } from "@api/controllers/chat/fetchChatId";

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
    { schema: basicAuthSchema, onRequest: [fastify.verifyJWT] },
    fetchUserChatsController
  );
  fastify.post(
    "/new-message/:chatId",
    {
      schema: newMessageSchema,
      onRequest: [fastify.verifyJWT],
    },
    createMessageController
  );

  fastify.get(
    "/fetch-messages/:chatId",
    {
      schema: fetchMessagesSchema,
      onRequest: [fastify.verifyJWT],
    },
    fetchChatMessagesController
  );

  fastify.get<{ Querystring: FetchChatQuery }>(
    "/fetch-chat",
    {
      schema: fetchChatSchema,
      onRequest: fastify.verifyJWT,
    },
    fetchChatIdController
  );
};
