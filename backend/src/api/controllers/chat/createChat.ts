import { newChatRequest } from "@api/routes/schemas/chat/newChat.schema";
import chatServices from "@services/chatServices";
import { FastifyRequest, FastifyReply } from "fastify";
import { ApiError } from "@api/errors/ApiError";

export const createChatController = async (
  request: FastifyRequest<{ Body: newChatRequest }>,
  reply: FastifyReply
) => {
  try {
    const requestingUser = request.user.username;

    const targetUser = request.body.username;
    const chat = await chatServices.createChat(requestingUser, targetUser);

    reply.send({ chatId: chat._id });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
