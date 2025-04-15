import he from "he";
import mongoose from "mongoose";
import { Message } from "@models/Message";
import { createMessage } from "../utils/createMessage";

describe("createMessage", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/chatdb");
  });

  afterAll(async () => {
    await Message.deleteMany({});
    await mongoose.disconnect();
  });

  it("should save a sanitized message to db", async () => {
    const authorUsername = "user";
    const content = "<script>${malicious}</tag>!!print()~^";
    const chatId = "123";

    const sanitizedContent = he.encode(content);
    const foundMessage = await Message.findOne({
      content: sanitizedContent,
      chatId: chatId,
      authorName: authorUsername,
    });
    const result = await createMessage(authorUsername, content, chatId);

    expect(result.content).toEqual(sanitizedContent);
    expect(foundMessage).toBeDefined;
  });
});
