/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Book } from "./type";

export type BooksResponse = Book & {};

async function getBook<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/books/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetBookById<T extends BooksResponse>(id?: string) {
  const queryKey = ["get-book-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getBook(id),
    enabled: !!id,
  });
}
