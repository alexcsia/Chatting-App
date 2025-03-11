import mongoose, { Date, Document, Schema } from "mongoose";

export interface IMessage extends Document {
  content: string;
  username: string;
  timeStamp: Date;
  chatId: string;
}

const MessageSchema: Schema = new Schema({
  username: { type: String, required: true, minlength: 1, maxlength: 20 },
  content: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
