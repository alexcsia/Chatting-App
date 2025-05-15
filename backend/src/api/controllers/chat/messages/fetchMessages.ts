import { FastifyRequest, FastifyReply } from "fastify";
import { fetchMessagesQuery } from "@api/routes/schemas/chat/messages/fetchMessages.schema";
import chatService from "@services/chatServices";
import { cacheMessages, getCachedMessages } from "redisDb/cache/messageCache";
import { ApiError } from "@api/errors/ApiError";
import { presentMessageList } from "../presenters/messageListPresenter";

export const fetchChatMessagesController = async (
  request: FastifyRequest<{
    Params: fetchMessagesQuery;
    Querystring: { before?: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const { chatId } = request.params;
    const before = request.query.before
      ? parseInt(request.query.before, 10)
      : undefined;

    const user = request.user.username;

    if (!before) {
      const cachedMessages = await getCachedMessages(chatId);
      if (cachedMessages) return reply.send(cachedMessages);
    }

    const messageList = await chatService.fetchChatMessages(
      chatId,
      user,
      before
    );

    await cacheMessages(chatId, messageList);

    reply.status(200).send(presentMessageList(messageList));
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
