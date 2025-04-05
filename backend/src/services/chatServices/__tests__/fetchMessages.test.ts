import { Chat } from "@models/Chat";
import mongoose from "mongoose";
import { fetchChatMessages } from "../fetchMessages";
import { Message } from "@models/Message";
import he from "he";
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
      content: he.encode("<script>alert('test');</script>!${}"),
    });

    await Message.create({
      chatId: chat._id,
      authorUsername: "testUser2",
      content: he.encode("${false}<script/><b></b>"),
    });
  });

  afterAll(async () => {
    await User.deleteMany();
    await Message.deleteMany();
    await Chat.deleteMany();
    await mongoose.disconnect();
  });

  it("should fetch and decode messages in a chat", async () => {
    const chat = (await Chat.findOne({
      userIds: ["testUser1", "testUser2"],
    })) as IChat;

    const chatId = chat._id.toString();

    const decodedMessages = await fetchChatMessages(chatId);

    expect(decodedMessages).toBeInstanceOf(Array);
    expect(decodedMessages.length).toBe(2);
    console.log("content", decodedMessages[0].content);

    expect(decodedMessages[0].content).toBe(
      "<script>alert('test');</script>!${}"
    );
    expect(decodedMessages[1].content).toBe("${false}<script/><b></b>");
  });

  it("should return an empty array if no messages are found", async () => {
    const chat = await Chat.create({ userIds: ["testUser1", "testUser2"] });

    const decodedMessages = await fetchChatMessages(chat._id.toString());

    expect(decodedMessages).toBeInstanceOf(Array);
    expect(decodedMessages.length).toBe(0);
  });
});
