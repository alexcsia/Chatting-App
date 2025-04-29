import { FastifyRequest, FastifyReply } from "fastify";
import { ApiError } from "@api/errors/ApiError";
import { loginRequest } from "@api/routes/schemas/auth/login.schema";
import jwtUtils from "@helpers/jwtUtils";
import { AuthServiceType } from "@services/authServices/authService";

export const loginController =
  (authService: AuthServiceType) =>
  async (req: FastifyRequest<{ Body: loginRequest }>, reply: FastifyReply) => {
    try {
      const { email, password } = req.body;

      const { authenticateUser, generateAuthenticationTokens } = authService;

      const user = await authenticateUser(email, password);

      const tokens = await generateAuthenticationTokens(user, {
        refreshToken: true,
      });

      jwtUtils.setAuthCookies(tokens.accessJwt, tokens.refreshJwt, reply);

      return reply.status(200).send({ message: "Login successful" });
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        reply.status(error.status).send({ message: error.message });
      } else {
        console.error("Unexpected error:", error);
        return reply
          .status(500)
          .send({ error: "An unexpected error occurred" });
      }
    }
  };
