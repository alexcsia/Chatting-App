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

    authServices.registerUser(username, email, password);

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
