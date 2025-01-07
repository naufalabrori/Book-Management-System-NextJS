/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { User } from "./type";

export type UserResponse = User & {
  data: User[];
  totalData: number;
};

export type UserParams = User & PaginationParams;

async function getUser<T>(params: UserParams): Promise<T> {
  const res = await axiosClient
    .get("/users", { params })
    .then((res: any) => {
      return {
        data: res.data.data.data,
        totalData: res.data.data.totalData,
      };
    });

  return res;
}

export function useListUser<T extends UserResponse>(
  params: UserParams
) {
  return useQuery<T>({
    queryKey: ["get-list-user", JSON.stringify(params)],
    queryFn: () => getUser(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}