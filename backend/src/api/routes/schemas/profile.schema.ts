export const profileRequestSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  params: {
    type: "object",
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
};
