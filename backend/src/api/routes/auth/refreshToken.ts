import { FastifyInstance } from "fastify";
import { refreshTokenController } from "@api/controllers/auth/refreshToken";
import { authService } from "@services/authServices/authService";

export const refreshTokenRoute = (fastify: FastifyInstance) => {
  fastify.get(
    "/refresh-token",
    { onRequest: [fastify.verifyRefreshJWT] },
    refreshTokenController(authService(fastify))
  );
};
