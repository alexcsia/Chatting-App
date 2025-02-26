import { FastifyReply } from "fastify";

export const setAuthCookies = (
  accessJwt: string,
  refreshJwt: string,
  reply: FastifyReply
) => {
  setAccessTokenCookie(accessJwt, reply);
  setRefreshTokenCookie(refreshJwt, reply);
};

const setAccessTokenCookie = (accessJwt: string, reply: FastifyReply): void => {
  reply.setCookie("accessToken", accessJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, //15 mins
  });
};

const setRefreshTokenCookie = (
  refreshJwt: string,
  reply: FastifyReply
): void => {
  reply.setCookie("refreshToken", refreshJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
};
