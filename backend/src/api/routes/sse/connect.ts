import { FastifyInstance } from "fastify";
import { sseConnectController } from "@api/controllers/sse/connect";
import { basicAuthSchema } from "../schemas/auth/basicAuth.schema";

export const sseConnectRoute = (fastify: FastifyInstance) => {
  fastify.get(
    "/connect",
    {
      schema: basicAuthSchema,
      onRequest: [fastify.verifyJWT],
    },
    sseConnectController
  );
};
