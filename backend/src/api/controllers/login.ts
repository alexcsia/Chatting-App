import { FastifyRequest, FastifyReply } from "fastify";
import authServices from "../../services/authServices/index";
import { ApiError } from "../errors/ApiError";
import jwtUtils from "../../helpers/jwtUtils";
import { loginRequest } from "../routes/schemas/login.schema";

export const loginController = async (
  req: FastifyRequest<{ Body: loginRequest }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = req.body;

    const { accessJwt, refreshJwt } = await authServices.loginUser(
      email,
      password
    );

    jwtUtils.setAuthCookies(accessJwt, refreshJwt, reply);

    return reply.send({ message: "Login successful" });
  } catch (error: unknown) {
    if (error instanceof ApiError)
      reply.status(error.status).send(error.message);
    else reply.status(500).send("Something went wrong.");
  }
};
