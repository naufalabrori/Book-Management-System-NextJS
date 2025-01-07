/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "./type";

export type TransactionsResponse = Transaction & {};

async function getTransaction<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/transactions/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetTransactionById<T extends TransactionsResponse>(id?: string) {
  const queryKey = ["get-transaction-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
}
