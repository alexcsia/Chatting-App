import { createChatController } from "@api/controllers/createChat";
import { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";
import { newChatSchema } from "./schemas/newChat.schema";
import { fetchUserChatsController } from "@api/controllers/fetchChats";
import { basicAuthSchema } from "./schemas/basicAuth.schema";
import { createMessageController } from "@api/controllers/createMessage";
import { newMessageSchema } from "./schemas/newMessage.schema";
import { fetchMessagesSchema } from "./schemas/fetchMessages.schema";
import { fetchChatMessagesController } from "@api/controllers/fetchMessages";

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
};
