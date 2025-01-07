/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { Category } from "./type";

export type CategoryResponse = Category & {
  data: Category[];
  totalData: number;
};

export type CategoryParams = Category & PaginationParams;

async function getCategory<T>(params: CategoryParams): Promise<T> {
  const res = await axiosClient
    .get("/categories", { params })
    .then((res: any) => {
      return {
        data: res.data.data.data,
        totalData: res.data.data.totalData,
      };
    });

  return res;
}

export function useListCategory<T extends CategoryResponse>(
  params: CategoryParams
) {
  return useQuery<T>({
    queryKey: ["get-list-category", JSON.stringify(params)],
    queryFn: () => getCategory(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}