import { FastifyRequest, FastifyReply } from "fastify";
import chatService from "@services/chatServices";
import { ApiError } from "@api/errors/ApiError";
import {
  NewMessageBody,
  NewMessageParams,
} from "@api/routes/schemas/chat/newMessage.schema";

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
    return reply.send(newMessage);
  } catch (error: unknown) {
    if (error instanceof ApiError)
      return reply.status(error.status).send({ error: error.message });
    else {
      console.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  }
};
