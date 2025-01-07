import { BaseType } from "../baseType";

export type Book = BaseType & {
  title?: string;
  author?: string;
  publisher?: string;
  publishedYear?: string;
  isbn?: string;
  categoryId?: string;
  quantity?: number;
  availableQuantity?: number;
};