import { sub } from "redis";
import { IMessage } from "@models/Message";

export const subscribeRedis = () => {
  sub.subscribe("chat", () => {
    console.log("subscribed to redis channel");
  });
};

export const receiveMessage = (callback: (message: IMessage) => void) => {
  sub.on("message", (channel, rawMessage) => {
    const message: IMessage = JSON.parse(rawMessage);
    console.log("message", message, "channel", channel);
    callback(message);
  });
};
