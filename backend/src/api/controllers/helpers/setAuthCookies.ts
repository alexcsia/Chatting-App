import { FastifyReply } from "fastify";

const isProduction = process.env.NODE_ENV === "production";

export const setAuthCookies = (
  accessJwt: string,
  refreshJwt: string | undefined,
  reply: FastifyReply
) => {
  setAccessTokenCookie(accessJwt, reply);
  if (refreshJwt) setRefreshTokenCookie(refreshJwt, reply);
};

export const setAccessTokenCookie = (
  accessJwt: string,
  reply: FastifyReply
): void => {
  reply.setCookie("accessToken", accessJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60, //15 mins
    path: "/",
  });
};

const setRefreshTokenCookie = (
  refreshJwt: string,
  reply: FastifyReply
): void => {
  reply.setCookie("refreshToken", refreshJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
};
