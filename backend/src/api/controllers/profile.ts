import { ApiError } from "@api/errors/ApiError";
import { AuthServiceType } from "@services/authServices/authService";
import { FastifyRequest, FastifyReply } from "fastify";

export const profileController =
  (authService: AuthServiceType) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { accessToken, refreshToken } = request.cookies;

      console.log(accessToken, refreshToken);

      const { getUserFromJWT } = authService;
      if (!accessToken) throw new ApiError(401, "Please login first");
      const { email, username, friendList } = await getUserFromJWT(accessToken);

      return reply.send({
        email: email,
        username: username,
        friendList: friendList,
      });
    } catch (error: unknown) {
      if (error instanceof ApiError)
        reply.status(error.status).send(error.message);
      else reply.status(500).send("Something went wrong.");
    }
  };
