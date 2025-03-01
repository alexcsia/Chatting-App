import { FastifyRequest, FastifyReply } from "fastify";

export const profileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { accessToken, refreshToken } = request.cookies;

  console.log(accessToken, refreshToken);

  reply.send("received ");
};
