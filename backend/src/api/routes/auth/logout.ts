import { FastifyInstance } from "fastify";
import { basicAuthSchema } from "../schemas/auth/basicAuth.schema";
import { logoutController } from "@api/controllers/auth/logout";

export const logoutRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/logout",
    { onRequest: [fastify.verifyRefreshJWT], schema: basicAuthSchema },
    logoutController
  );
};
