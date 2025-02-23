import { FastifyRequest, FastifyReply } from "fastify";
import { loginService } from "../../services/auth/login.service";

interface loginRequest {
  email: string;
  password: string;
}

export const loginUser = async (
  req: FastifyRequest<{ Body: loginRequest }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  loginService(email, password);
};
