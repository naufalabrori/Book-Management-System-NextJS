/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { TransactionExt } from "./type";

export type TransactionResponse = TransactionExt & {
  data: TransactionExt[];
  totalData: number;
};

export type TransactionParams = TransactionExt & PaginationParams;

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