export const fetchChatSchema = {
  querystring: {
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

export interface FetchChatQuery {
  username: string;
}
