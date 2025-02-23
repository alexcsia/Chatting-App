import { FastifyRequest, FastifyReply } from "fastify";

interface loginRequest {
  email: string;
  password: string;
}

export const loginUser = async (
  req: FastifyRequest<{ Body: loginRequest }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  // loginUser(email, password)
};
