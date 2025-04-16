import Fastify from "fastify";
import { setupWebsocketServer } from "../websockets/websocketServer";
import { Server } from "socket.io";
import { io as Client } from "socket.io-client";

describe("WebSocket Server", () => {
  let fastify: ReturnType<typeof Fastify>;
  let io: Server;
  let clientSocket: ReturnType<typeof Client>;

  beforeAll(async () => {
    fastify = Fastify({ logger: false });
    io = setupWebsocketServer(fastify);
    await fastify.listen({ port: 3001 });

    clientSocket = Client("http://localhost:3001");

    await new Promise<void>((resolve) => {
      clientSocket.on("connect", resolve);
    });
  });

  afterAll(async () => {
    clientSocket.close();
    await fastify.close();
  });

  test("should connect a client to the websocket server", () => {
    expect(clientSocket.connected).toBe(true);
  });

  test("should receive a message from the server", (done) => {
    clientSocket.on("receiveMessage", (data) => {
      expect(data.message).toBe("hi there");
      done();
    });

    clientSocket.emit("sendMessage", "hi there");
  }, 10000);
});
