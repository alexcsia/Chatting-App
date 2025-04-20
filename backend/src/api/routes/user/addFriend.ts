import { addFriendController } from "@api/controllers/user/addFriend";
import { FastifyInstance } from "fastify";
import { addFriendSchema } from "../schemas/user/addFriend.schema";

export const addFriendRoute = (fastify: FastifyInstance) => {
  fastify.post(
    "/add-friend",
    { schema: addFriendSchema, onRequest: [fastify.verifyJWT] },
    addFriendController
  );
};
