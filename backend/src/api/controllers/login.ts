import { FastifyRequest, FastifyReply } from "fastify";
import authServices from "../../services/authServices/index";
import { ApiError } from "../errors/ApiError";

interface loginRequest {
  email: string;
  password: string;
}

export const loginController = async (
  req: FastifyRequest<{ Body: loginRequest }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = req.body;

    await authServices.loginUser(email, password);
    
  } catch (error: unknown) {
    if (error instanceof ApiError)
      reply.status(error.status).send(error.message);
    else reply.status(500).send("Something went wrong.");
  }
};
