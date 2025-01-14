import { BaseType } from "../baseType";

export type User = BaseType & {
  name?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
  image?: string;
}

export type UserLogin = {
  email?: string;
  password?: string;
}

export type UserLoginResponse = {
  token: string;
  user: User
}