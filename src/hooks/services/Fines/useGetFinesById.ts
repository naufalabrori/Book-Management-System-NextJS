/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Fines } from "./type";

export type FinesResponse = Fines & {};

async function getFines<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/fines/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetFinesById<T extends FinesResponse>(id?: string) {
  const queryKey = ["get-fines-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getFines(id),
    enabled: !!id,
  });
}
