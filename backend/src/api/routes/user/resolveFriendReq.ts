import { resolveFriendReqController } from "@api/controllers/user/resolveFriendReq";
import { FastifyInstance } from "fastify";
import { resolveFriendReqSchema } from "../schemas/user/resolveFriendReq.schema";

export const resolveFriendReqRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/friend-request/:username",
    { schema: resolveFriendReqSchema, onRequest: [fastify.verifyJWT] },
    resolveFriendReqController
  );
};
