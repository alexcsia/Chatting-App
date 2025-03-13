import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  userIds: string[];
}

const ChatSchema: Schema = new Schema({
  userIds: { type: [String], required: true },
});

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
