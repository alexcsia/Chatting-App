export const fetchChatSchema = {
  params: {
    type: "object",
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
};

export interface FetchChatParams {
  username: string;
}
