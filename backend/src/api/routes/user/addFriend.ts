import { addFriendController } from "@api/controllers/user/addFriend";
import { FastifyInstance } from "fastify";
import { basicFriendReqSchema } from "../schemas/user/addFriend.schema";

export const addFriendRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/add-friend",
    { schema: basicFriendReqSchema, onRequest: [fastify.verifyJWT] },
    addFriendController
  );
};
