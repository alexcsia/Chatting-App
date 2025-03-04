import { verifyJWT } from "@helpers/jwtUtils/verifyJWT";
import { FastifyInstance } from "fastify";
import { getUserByEmail } from "@repositories/userRepo";

interface IUserProfile {
  email: string;
  username: string;
  friendList: string[];
}

export const getUserFromJWT = async (
  fastify: FastifyInstance,
  token: string
): Promise<IUserProfile> => {
  const { email } = await verifyJWT(fastify, token);
  const user = (await getUserByEmail(email)) as IUserProfile;
  return {
    email: user.email,
    username: user.username,
    friendList: user.friendList,
  };
};
