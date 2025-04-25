import { FastifyInstance } from "fastify";
import { sendMessage } from "../events";
import redisUtils from "redisDb";

jest.mock("redisDb", () => ({
  publishToRedis: jest.fn(),
  subscribeRedis: jest.fn(),
  receiveMessage: jest.fn(),
}));

describe("sendMessage event", () => {
  let socket: any;
  let fastify: Partial<FastifyInstance>;

  beforeEach(() => {
    fastify = {
      log: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      } as any,
    };
  });

  it("logs a warning for an invalid message", () => {
    const invalidMessage = { wrong: "data" };

    const handler = sendMessage(socket, fastify as FastifyInstance);
    handler(invalidMessage);

    expect(redisUtils.publishToRedis).not.toHaveBeenCalled();
    expect(fastify.log?.warn).toHaveBeenCalled();
  });

  it("publishes a valid message to Redis", () => {
    const validMessage = {
      chatId: "chat123",
      authorUsername: "user1",
      content: "Hello!",
      timeStamp: new Date(),
    };

    const handler = sendMessage(socket, fastify as FastifyInstance);
    handler(validMessage);

    expect(redisUtils.publishToRedis).toHaveBeenCalledWith(validMessage);
    expect(fastify.log?.info).toHaveBeenCalledWith(
      { message: validMessage },
      "message received"
    );
  });
});
