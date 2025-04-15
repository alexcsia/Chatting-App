import { IMessage } from "@models/Message";
import { pub } from "redis";

export const publishToRedis = (message: IMessage) => {
  pub.publish("chat", JSON.stringify(message));
};
