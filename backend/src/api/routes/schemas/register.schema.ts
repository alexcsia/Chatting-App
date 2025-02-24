export const registerRequestSchema = {
  type: "object",
  required: ["username", "email", "firstName", "lastName", "password"],
  properties: {
    username: { type: "string" },
    email: { type: "string" },
  },
};
