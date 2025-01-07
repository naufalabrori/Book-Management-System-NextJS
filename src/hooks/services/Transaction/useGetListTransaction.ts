/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { Transaction } from "./type";

export type TransactionResponse = Transaction & {
  data: Transaction[];
  totalData: number;
};

export type TransactionParams = Transaction & PaginationParams;

async function getTransaction<T>(params: TransactionParams): Promise<T> {
  const res = await axiosClient
    .get("/transactions", { params })
    .then((res: any) => {
      return {
        data: res.data.data.data,
        totalData: res.data.data.totalData,
      };
    });

  return res;
}

export function useListTransaction<T extends TransactionResponse>(
  params: TransactionParams
) {
  return useQuery<T>({
    queryKey: ["get-list-transaction", JSON.stringify(params)],
    queryFn: () => getTransaction(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}