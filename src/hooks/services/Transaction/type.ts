import { BaseType } from "../baseType";

export type Transaction = BaseType & {
  userId?: string;
  bookId?: string;
  borrowedDate?: string;
  dueDate?: string;
  returnedDate?: string;
  status?: string;
}