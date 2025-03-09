import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      email: string; //access token payload
      username: string;
    };

    user: {
      email: string;
      username: string;
    };
  }
}
