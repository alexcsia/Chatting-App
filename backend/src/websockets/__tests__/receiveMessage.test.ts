import { FastifyInstance } from "fastify";
import { receiveMessage } from "../events/receiveMessage";
import * as redisDb from "redisDb/cache/messageCache";
import { Server } from "socket.io";
import { IMessage } from "@models/Message";

jest.mock("redisDb/cache/messageCache", () => ({
  updateCachedMessages: jest.fn(),
}));

describe("receiveMessage", () => {
  let fastify: Partial<FastifyInstance>;
  let io: Partial<Server>;
  let activeChats: Map<string, Set<string>>;

  beforeEach(() => {
    jest.clearAllMocks();
    fastify = {
      log: {
        error: jest.fn(),
      } as any,
    };

    activeChats = new Map<string, Set<string>>();
  });

  it("emits message and updates cache if chat is active", async () => {
    const message = {
      chatId: "chat",
      authorUsername: "user1",
      content: "message",
      timeStamp: new Date(),
    } as unknown as IMessage;

    const emitMock = jest.fn();
    const toMock = jest.fn().mockReturnValue({ emit: emitMock });

    io = { to: toMock };

    activeChats.set("chat", new Set(["socket1"]));

    const handler = receiveMessage(
      io as Server,
      activeChats,
      fastify as FastifyInstance
    );
    await handler(message);

    expect(toMock).toHaveBeenCalledWith("chat");
    expect(emitMock).toHaveBeenCalledWith("receiveMessage", message);
    expect(redisDb.updateCachedMessages).toHaveBeenCalledWith("chat", message);
  });

  it("does nothing if chat is not active", async () => {
    const message = {
      chatId: "chat",
      authorUsername: "user2",
      content: "message",
      timeStamp: new Date(),
    } as unknown as IMessage;

    const handler = receiveMessage(
      io as Server,
      activeChats,
      fastify as FastifyInstance
    );
    await handler(message);

    expect(io.to).not.toHaveBeenCalled();
    expect(redisDb.updateCachedMessages).not.toHaveBeenCalled();
  });

  it("logs an error if an exception is thrown", async () => {
    const message = {
      chatId: "chat",
      authorUsername: "user3",
      content: "message",
      timeStamp: new Date(),
    } as unknown as IMessage;

    activeChats.set("chat", new Set(["socket2"]));

    (io.to as jest.Mock).mockImplementation(() => {
      throw new Error("emit failed");
    });

    const handler = receiveMessage(
      io as Server,
      activeChats,
      fastify as FastifyInstance
    );
    await handler(message);

    expect(fastify.log?.error).toHaveBeenCalled();
  });
});
