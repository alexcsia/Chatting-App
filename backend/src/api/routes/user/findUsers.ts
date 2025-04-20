import { FastifyInstance } from "fastify";
import { findUsersSchema } from "../schemas/user/findUsers.schema";
import { findUsersController } from "@api/controllers/user/findUsers";

export const findUsersRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/find-user/:username",
    { schema: findUsersSchema, onRequest: [fastify.verifyJWT] },
    findUsersController
  );
};
