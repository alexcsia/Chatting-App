import { FastifyInstance } from "fastify";
import sse from "./sse";

export const sseRoutes = async (fastify: FastifyInstance) => {
  sse.sseConnectRoute(fastify);
};
