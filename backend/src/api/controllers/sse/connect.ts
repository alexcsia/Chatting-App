import { FastifyRequest, FastifyReply } from "fastify";

export const sseConnectController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const username = request.user.username;
};
