import { IMessage } from "@models/Message";

export const presentMessageList = (messageList: IMessage[]) => {
  return messageList.map((message) => ({
    content: message.content,
    username: message.username,
    timeStamp: message.timeStamp,
    chatId: message.chatId,
    authorUsername: message.authorUsername,
  }));
};
