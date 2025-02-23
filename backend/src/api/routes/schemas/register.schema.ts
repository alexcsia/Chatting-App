export const registerRequestSchema = {
  type: "object",
  required: ["username", "email"],
  properties: {
    username: { type: "string" },
    email: { type: "string" },
  },
};
