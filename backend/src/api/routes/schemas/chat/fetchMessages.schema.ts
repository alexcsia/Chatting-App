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
};

export interface fetchMessagesQuery {
  chatId: string;
}
