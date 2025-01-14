/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { User } from "./type";

export type UsersResponse = {
  success: boolean;
  message: string;
  data: User;
};

async function getUser<T>(id?: number): Promise<T> {
  return await axiosClient.get(`/users/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetUserById<T extends UsersResponse>(id?: number) {
  const queryKey = ["get-user-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getUser(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}
