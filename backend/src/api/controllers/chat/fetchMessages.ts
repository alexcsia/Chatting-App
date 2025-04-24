import { FastifyRequest, FastifyReply } from "fastify";
import { fetchMessagesQuery } from "@api/routes/schemas/chat/fetchMessages.schema";
import chatService from "@services/chatServices";
import { cacheMessages, getCachedMessages } from "redisDb/cache";
import { ApiError } from "@api/errors/ApiError";

export const fetchChatMessagesController = async (
  request: FastifyRequest<{ Params: fetchMessagesQuery }>,
  reply: FastifyReply
) => {
  try {
    const { chatId } = request.params;

    const cachedMessages = await getCachedMessages(chatId);
    if (cachedMessages) return reply.send(cachedMessages);
    const messageList = await chatService.fetchChatMessages(chatId);

    await cacheMessages(chatId, messageList);

    reply.send(messageList);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
