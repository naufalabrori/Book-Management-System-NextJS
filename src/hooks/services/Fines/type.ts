import { BaseType } from "../baseType";

export type Fines = BaseType & {
  transactionId?: string;
  amount?: number;
  paidDate?: string;
};