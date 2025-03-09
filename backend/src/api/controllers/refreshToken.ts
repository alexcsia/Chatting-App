import { FastifyReply, FastifyRequest } from "fastify";

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log("user from refresh token", request.refreshUser);
  //at this stage refresh token is verified

  //exchange it for a new access token
  const userId = request.refreshUser?.userId;

  //   const accessTokenPayload = await getUser()

  //   setAccessToken(accessTokenPayload)

  reply.send();
};
