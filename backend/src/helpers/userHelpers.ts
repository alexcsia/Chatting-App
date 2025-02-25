import { IUser } from "../models/User";

export function createUserObject(
  username: string,
  email: string,
  password: string
) {
  const userObj: Partial<IUser> = {
    username: username,
    email: email,
    password: password,
  };

  return userObj;
}
