import { ApiError } from "@api/errors/ApiError";
import { getUserByEmail } from "@repositories/userRepo";
import { FastifyRequest, FastifyReply } from "fastify";

export const profileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    console.log(request.user);
  } catch (error: unknown) {
    if (error instanceof ApiError)
      reply.status(error.status).send(error.message);
    else reply.status(500).send("Something went wrong.");
  }
};
