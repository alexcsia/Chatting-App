import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../errors/ApiError";

interface registrationRequest {
  username: string;
  email: string;
}

export const registerController = async (
  request: FastifyRequest<{ Body: registrationRequest }>,
  reply: FastifyReply
) => {
  try {
    const { username, email } = request.body;

    console.log(`${username}, ${email}`);
    reply.send({ message: "received " });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return reply.status(error.status).send({ message: error.message });
    }

    throw new ApiError(
      500,
      error instanceof Error ? error.message : " User registration failed"
    );
  }
};
