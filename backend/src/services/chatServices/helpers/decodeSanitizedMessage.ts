import he from "he";

export const decodeContent = (content: string) => {
  const decodedContent = he.decode(content);

  return decodedContent;
};
