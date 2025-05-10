import { ApiError } from "@api/errors/ApiError";
import {
  IResolveFriendRequestBody,
  IResolveRequestParams,
} from "@api/routes/schemas/user/resolveFriendReq.schema";
import userServices from "@services/userServices";
import { constructPayload } from "@services/userServices/helpers/sse/constructPayload";
import { FastifyReply, FastifyRequest } from "fastify";
import { cache, pub } from "redisDb";

export const resolveFriendReqController = async (
  request: FastifyRequest<{
    Body: IResolveFriendRequestBody;
    Params: IResolveRequestParams;
  }>,
  reply: FastifyReply
) => {
  try {
    const requestingUser = request.user.username;
    const targetUser = request.params.username;
    const requestAccepted = request.body.accepted;

    if (requestAccepted) {
      await userServices.addUserToFriendList(requestingUser, targetUser);

      const isOnline = await cache.sIsMember("online-users", targetUser);

      const payload = constructPayload("friendRequestAccepted", requestingUser);
      if (isOnline) {
        await pub.publish(`sse:${targetUser}`, JSON.stringify(payload));
      } else {
        await cache.rPush(
          `pending-requests:${targetUser}`,
          JSON.stringify(payload)
        );
      }
    } else await userServices.removeFriendRequest(requestingUser, targetUser);

    reply.status(200).send({ message: "Action successful" });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      return reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
