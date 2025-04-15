import { z } from "zod";

export const messageSchema = z.object({
  authorUsername: z.string().min(1).max(20),
  content: z.string().min(1).max(1000),
  timeStamp: z.date(),
  chatId: z.string().min(1),
});

export type ChatMessage = z.infer<typeof messageSchema>;
