import { BaseType } from "../baseType";

export type Transaction = BaseType & {
  user_id?: string;
  book_id?: string;
  borrowed_date?: string;
  due_date?: string;
  returned_date?: string;
  status?: string;
}

export type TransactionExt = Transaction & {
  user_email?: string;
  user_name?: string;
  book_title?: string;
}