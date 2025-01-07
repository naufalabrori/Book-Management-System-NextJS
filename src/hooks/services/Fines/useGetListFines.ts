/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { Fines } from "./type";

export type FinesResponse = Fines & {
  data: Fines[];
  totalData: number;
};

export type FinesParams = Fines & PaginationParams;

async function getFines<T>(params: FinesParams): Promise<T> {
  const res = await axiosClient
    .get("/fines", { params })
    .then((res: any) => {
      return {
        data: res.data.data.data,
        totalData: res.data.data.totalData,
      };
    });

  return res;
}

export function useListFines<T extends FinesResponse>(
  params: FinesParams
) {
  return useQuery<T>({
    queryKey: ["get-list-Fines", JSON.stringify(params)],
    queryFn: () => getFines(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}