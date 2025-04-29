import { ApiError } from "@api/errors/ApiError";
import { FetchChatQuery } from "@api/routes/schemas/chat/fetchChat.schema";
import chatServices from "@services/chatServices";
import { FastifyReply, FastifyRequest } from "fastify";

export const fetchChatIdController = async (
  request: FastifyRequest<{ Querystring: FetchChatQuery }>,
  reply: FastifyReply
) => {
  try {
    const usernameFromReq = request.user.username;
    const usernameFromQuery = request.query.username;

    const usernames: string[] = [usernameFromReq, usernameFromQuery];

    const chatId = await chatServices.fetchChatId(usernames);

    reply.send(chatId);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
