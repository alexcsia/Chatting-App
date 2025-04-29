export const fetchMessagesSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  params: {
    type: "object",
    required: ["chatId"],
    properties: {
      chatId: { type: "string" },
    },
  },
  querystring: {
    type: "object",
    properties: {
      before: { type: "string", pattern: "^[0-9]+$" },
    },
    required: [],
  },
};

export interface fetchMessagesQuery {
  chatId: string;
}
