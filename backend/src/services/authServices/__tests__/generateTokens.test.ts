import fastify from "../../../server";
import { generateAuthenticationTokens } from "../generateTokens";

describe("generateAuthenticationTokens", () => {
  beforeAll(async () => {
    if (!fastify.server.address()) {
      await fastify.ready();
    }
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("should generate an access JWT", async () => {
    const user = {
      username: "testuser",
      email: "test@example.com",
      userId: "123456",
    };
    const options = { refreshToken: false };

    const tokens = await generateAuthenticationTokens(fastify, user, options);

    expect(tokens).toHaveProperty("accessJwt");
    expect(typeof tokens.accessJwt).toBe("string");
  });

  it("should generate both access and refresh JWTs when refreshToken is true", async () => {
    const user = {
      username: "testuser",
      email: "test@example.com",
      userId: "123456",
    };
    const options = { refreshToken: true };

    const tokens = await generateAuthenticationTokens(fastify, user, options);

    expect(tokens).toHaveProperty("accessJwt");
    expect(tokens).toHaveProperty("refreshJwt");
    expect(typeof tokens.accessJwt).toBe("string");
    expect(typeof tokens.refreshJwt).toBe("string");
  });
});
