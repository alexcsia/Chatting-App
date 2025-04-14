import { FastifyInstance } from "fastify";
import { basicAuthSchema } from "../schemas/auth/basicAuth.schema";
import { userInfoController } from "@api/controllers/user/userInfo";

export const userInfoRoute = (fastify: FastifyInstance) => {
  fastify.get(
    "/user-info",
    { schema: basicAuthSchema, onRequest: [fastify.verifyJWT] },
    userInfoController
  );
};
