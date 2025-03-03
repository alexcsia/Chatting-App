import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "@api/errors/ApiError";
import { registrationRequest } from "@api/routes/schemas/register.schema";
import { AuthServiceType } from "@services/authServices/authService";

export const registerController =
  (authService: AuthServiceType) =>
  async (
    request: FastifyRequest<{ Body: registrationRequest }>,
    reply: FastifyReply
  ) => {
    try {
      const { username, email, password } = request.body;

      authService.registerUser(username, email, password);
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
