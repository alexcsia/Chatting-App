import mongoose from "mongoose";
import { authenticateUser } from "../utils/authenticateUser";
import { ApiError } from "@api/errors/ApiError";
import { User } from "@models/User";
import bcrypt from "bcrypt";

describe("authenticateUser", () => {
  const testEmail = "testuser@example.com";
  let testUserId: any;
  let testPassword = "password123";
  const testUsername = "username";

  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/chatdb",
      { dbName: "chatdb" }
    );
    const hashedPassword = await bcrypt.hash(testPassword, 10);

    const user = await User.create({
      username: testUsername,
      password: hashedPassword,
      email: testEmail,
      friendList: [],
    });

    testUserId = user._id.toString();
  });

  afterAll(async () => {
    await User.deleteMany({ email: testEmail });
    await mongoose.disconnect();
  });

  it("should return user data for valid email and password", async () => {
    const result = await authenticateUser(testEmail, testPassword);
    expect(result).toMatchObject({
      email: testEmail,
      username: testUsername,
      userId: testUserId,
    });
  });

  it("should throw an error if the email is incorrect", async () => {
    await expect(
      authenticateUser("wrongemail@example.com", testPassword)
    ).rejects.toThrowError(new ApiError(401, "Email or password is incorrect"));
  });

  it("should throw an error if the password is incorrect", async () => {
    await expect(
      authenticateUser(testEmail, "wrongpassword")
    ).rejects.toThrowError(new ApiError(401, "Email or password is incorrect"));
  });
});
