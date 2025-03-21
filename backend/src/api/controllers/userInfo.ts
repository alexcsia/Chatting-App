import { FastifyReply, FastifyRequest } from "fastify";

export const userInfoController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const user = request.user;
    if (!user) return reply.status(401).send({ error: "Unauthorized" });

    reply.send({ username: user.username, email: user.email });
  } catch (error) {
    reply.status(500).send({ error: "Failed to retrieve user" });
  }
};
