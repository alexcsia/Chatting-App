import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  userIds: string[];
  _id: mongoose.Types.ObjectId;
}

const ChatSchema: Schema = new Schema({
  userIds: { type: [String], required: true },
});

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
