/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { Book } from "./type";

export type BookResponse = Book & {
  data: Book[];
  totalData: number;
};

export type BookParams = Book & PaginationParams;

async function getBook<T>(params: BookParams): Promise<T> {
  const res = await axiosClient
    .get("/books", { params })
    .then((res: any) => {
      return {
        data: res.data.data.data,
        totalData: res.data.data.totalData,
      };
    });

  return res;
}

export function useListBook<T extends BookResponse>(
  params: BookParams
) {
  return useQuery<T>({
    queryKey: ["get-list-book", JSON.stringify(params)],
    queryFn: () => getBook(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}