import Fastify, { FastifyInstance } from "fastify";
import path from "path";
import staticPlugin from "@fastify/static";
import userRoutes from "./api/routes/register";

const PORT = 3000;
const fastify: FastifyInstance = Fastify({ logger: false });

fastify.register(staticPlugin, {
  root: path.join(__dirname, "../../frontend/dist"),
});

fastify.register(userRoutes);

fastify.get("/", async () => {
  return { message: "Hello" };
});
fastify.get("/dashboard", async (res, reply) => {
  reply.send({ test: "Dashboard" });
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log("Fastify listening on port 3000");
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
