/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseType } from "../baseType";

export type Transaction = BaseType & {
  user_id?: string;
  book_id?: string;
  borrowed_date?: any;
  due_date?: any;
  returned_date?: any;
  status?: string;
}

export type TransactionExt = Transaction & {
  user_email?: string;
  user_name?: string;
  book_title?: string;
}