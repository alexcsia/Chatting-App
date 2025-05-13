import { IUser } from "@models/User";

export const presentUserInfo = (user: IUser) => ({
  username: user.username,
  email: user.email,
  userId: user._id,
  friendList: user.friendList,
  friendRequests: user.pendingFriendRequests,
});
