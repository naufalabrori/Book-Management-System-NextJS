import { BaseType } from "../baseType";

export type User = BaseType & {
  name?: string;
  email?: string;
  role?: string;
  phone_number?: string;
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

export type ChangePassword = {
  old_password: string;
  new_password: string;
}
