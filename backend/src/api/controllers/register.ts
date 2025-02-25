import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../errors/ApiError";
import authServices from "../../services/authServices";

interface registrationRequest {
  username: string;
  email: string;
  password: string;
}

export const registerController = async (
  request: FastifyRequest<{ Body: registrationRequest }>,
  reply: FastifyReply
) => {
  try {
    const { username, email, password } = request.body;

    await authServices.registerUser(username, email, password);
    reply.send("received");
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    }

    throw new ApiError(
      500,
      error instanceof Error ? error.message : " User registration failed"
    );
  }
};
