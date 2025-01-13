import { BaseType } from "../baseType";

export type Book = BaseType & {
  title?: string;
  author?: string;
  publisher?: string;
  published_year?: string;
  isbn?: string;
  category_id?: number;
  quantity?: number;
  available_quantity?: number;
};