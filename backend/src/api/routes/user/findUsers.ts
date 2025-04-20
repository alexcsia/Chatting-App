import { FastifyInstance } from "fastify";
import { findUsersSchema } from "../schemas/user/findUsers.schema";
import { findUsersController } from "@api/controllers/user/findUsers";

export const findUsersRoute = (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    { schema: findUsersSchema, onRequest: [fastify.verifyJWT] },
    findUsersController
  );
};
