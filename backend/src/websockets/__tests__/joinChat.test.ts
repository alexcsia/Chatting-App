import { FastifyInstance } from "fastify";
import { joinChat } from "websockets/events";
import mongoose from "mongoose";
import { Chat } from "@models/Chat";

describe("sendMessage event", () => {
  let socket: any;
  let fastify: Partial<FastifyInstance>;
  const activeChats = new Map<string, Set<string>>();
  let chatId: string;

  beforeEach(() => {
    socket = {
      id: "socketId",
      join: jest.fn(),
      data: {},
    };

    fastify = {
      log: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      } as any,
    };
  });

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/chatdb");

    const chat = await Chat.create({
      userIds: ["testUser1", "testUser2"],
    });
    chatId = chat._id.toString();
  });

  afterAll(async () => {
    await Chat.deleteOne({ _id: chatId });
    await mongoose.disconnect();
  });

  it("adds a chat to activeChats", () => {
    const handler = joinChat(socket, activeChats, fastify as FastifyInstance);
    handler(chatId);

    expect(fastify.log?.info).toHaveBeenCalled();
  });
});
