import { BaseType } from "../baseType";

export type User = BaseType & {
  name?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
}

export type UserLogin = {
  email?: string;
  password?: string;
}