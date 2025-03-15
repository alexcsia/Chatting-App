import he from "he";

export const sanitizeMessage = (content: string) => {
  const sanitizedContent = he.encode(content);
  return sanitizedContent;
};
