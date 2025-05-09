import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  friendList: Array<string>;
  userId: string;
  pendingFriendRequests: Array<string>;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 254,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 64,
  },
  friendList: {
    type: Array<string>,
    required: true,
  },
  pendingFriendRequests: {
    type: Array<string>,
    required: true,
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
export type UserDocument = IUser;
