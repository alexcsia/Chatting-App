import { FastifyRequest, FastifyReply } from "fastify";
import chatService from "@services/chatServices";
import { ApiError } from "@api/errors/ApiError";

export const fetchUserChatsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const user = request.user.username;
    const chatList = await chatService.fetchChatIds(user);

    reply.send(chatList);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
