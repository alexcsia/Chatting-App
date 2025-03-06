import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      email: string;
      username: string;
    };
    user: {
      email: string;
      username: string;
    };
  }
}
