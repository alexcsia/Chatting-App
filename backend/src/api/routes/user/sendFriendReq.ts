import { sendFriendReqController } from "@api/controllers/user/sendFriendRequest";
import { FastifyInstance } from "fastify";
import { basicFriendReqSchema } from "../schemas/user/addFriend.schema";

export const sendFriendReq = (fastify: FastifyInstance) => {
  fastify.post(
    "/friend-req",
    { schema: basicFriendReqSchema, onRequest: [fastify.verifyJWT] },
    sendFriendReqController
  );
};
