import { BaseType } from "../baseType";

export type Fines = BaseType & {
  transactionId?: number;
  amount?: number;
  paidDate?: string;
};