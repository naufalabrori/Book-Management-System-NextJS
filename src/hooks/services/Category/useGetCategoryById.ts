/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Category } from "./type";

export type CategoryResponse = Category & {};

async function getCategory<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/categories/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetCategoryById<T extends CategoryResponse>(id?: string) {
  const queryKey = ["get-category-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
}
