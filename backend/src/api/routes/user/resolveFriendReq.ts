import { resolveFriendReqController } from "@api/controllers/user/resolveFriendReq";
import { FastifyInstance } from "fastify";
import { resolveFriendReqSchema } from "../schemas/user/resolveFriendReq.schema";

export const resolveFriendReqRoute = (fastify: FastifyInstance) => {
  fastify.patch(
    "/:username/friend-requests",
    { schema: resolveFriendReqSchema, onRequest: [fastify.verifyJWT] },
    resolveFriendReqController
  );
};
