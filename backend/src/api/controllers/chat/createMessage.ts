import { FastifyRequest, FastifyReply } from "fastify";
import chatService from "@services/chatServices";
import { ApiError } from "@api/errors/ApiError";
import {
  NewMessageBody,
  NewMessageParams,
} from "@api/routes/schemas/chat/newMessage.schema";
import { deleteCachedMessages, updateCachedMessages } from "redis/cache";

export const createMessageController = async (
  request: FastifyRequest<{ Body: NewMessageBody; Params: NewMessageParams }>,
  reply: FastifyReply
) => {
  const authorUsername = request.user.username;
  const { chatId } = request.params;
  const { content } = request.body;

  try {
    const newMessage = await chatService.createMessage(
      authorUsername,
      content,
      chatId
    );

    await updateCachedMessages(chatId, newMessage);

    return reply.send(newMessage);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
