export const newMessageSchema = {
  headers: {
    type: "object",
    properties: {
      cookie: { type: "string", pattern: "accessToken" },
    },
    required: ["cookie"],
  },
  body: {
    type: "object",
    required: ["chatId", "content"],
    properties: {
      chatId: { type: "string" },
      content: { type: "string" },
    },
  },
};

export interface newMessageRequest {
  chatId: string;
  content: string;
}
