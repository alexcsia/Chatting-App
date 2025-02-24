import { FastifyRequest, FastifyReply } from "fastify";
import authServices from "../../services/authServices/index";

interface loginRequest {
  email: string;
  password: string;
}

export const loginController = async (
  req: FastifyRequest<{ Body: loginRequest }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  authServices.loginUser(email, password);
};
