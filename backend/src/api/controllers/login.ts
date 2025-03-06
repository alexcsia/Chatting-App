import { FastifyRequest, FastifyReply } from "fastify";
import { ApiError } from "@api/errors/ApiError";
import { loginRequest } from "@api/routes/schemas/login.schema";
import jwtUtils from "@helpers/jwtUtils";
import { AuthServiceType } from "@services/authServices/authService";

export const loginController =
  (authService: AuthServiceType) =>
  async (req: FastifyRequest<{ Body: loginRequest }>, reply: FastifyReply) => {
    try {
      const { email, password } = req.body;

      const { authenticateUser, generateTokens } = authService;

      const user = await authenticateUser(email, password);

      const { accessJwt, refreshJwt } = await generateTokens(user);

      jwtUtils.setAuthCookies(accessJwt, refreshJwt, reply);

      return reply.send({ message: "Login successful" });
    } catch (error: unknown) {
      if (error instanceof ApiError)
        reply.status(error.status).send(error.message);
      else reply.status(500).send("Something went wrong.");
    }
  };
