import { Chat } from "@models/Chat";
import mongoose from "mongoose";
import { fetchChatMessages } from "../utils/messages/fetchMessages";
import { Message } from "@models/Message";
import { IChat } from "@models/Chat";
import { User } from "@models/User";

describe("fetchChatMessages", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/chatdb");

    const chat = await Chat.create({
      userIds: ["testUser1", "testUser2"],
    });

    await Message.create({
      chatId: chat._id,
      authorUsername: "testUser1",
      content: "content1",
    });

    await Message.create({
      chatId: chat._id,
      authorUsername: "testUser2",
      content: "content 2",
    });
  });

  afterAll(async () => {
    await User.deleteMany();
    await Message.deleteMany();
    await Chat.deleteMany();
    await mongoose.disconnect();
  });

  it("should fetch messages in a chat", async () => {
    const chat = (await Chat.findOne({
      userIds: ["testUser1", "testUser2"],
    })) as IChat;

    const chatId = chat._id.toString();

    const messages = await fetchChatMessages(chatId);

    expect(messages).toBeInstanceOf(Array);
    expect(messages.length).toBe(2);

    expect(messages[0].content).toBe("content1");
    expect(messages[1].content).toBe("content 2");
  });

  it("should return an empty array if no messages are found", async () => {
    const chat = await Chat.create({ userIds: ["testUser3", "testUser4"] });

    const messages = await fetchChatMessages(chat._id.toString());

    expect(messages).toBeInstanceOf(Array);
    expect(messages.length).toBe(0);
  });
});
