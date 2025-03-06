import { ApiError } from "@api/errors/ApiError";
import { getUserByEmail } from "@repositories/userRepo";
import { FastifyRequest, FastifyReply } from "fastify";

export const profileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userInfo = await getUserByEmail(request.user.email);
    reply.code(200).send({
      username: userInfo?.username,
      email: userInfo?.email,
      friendList: userInfo?.friendList,
    });
  } catch (error: unknown) {
    if (error instanceof ApiError)
      reply.status(error.status).send(error.message);
    else reply.status(500).send("Something went wrong.");
  }
};
