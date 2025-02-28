import { FastifyRequest, FastifyReply } from "fastify";

export const profileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.cookies;

  console.log(token);

  reply.send("received ");
};
