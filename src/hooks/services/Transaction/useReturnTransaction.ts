/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const createUpdateBook = async (id: string) => {
    const res = await axiosClient
    .post(`/transactions/return/${id}`)
    .then((res: any) => {
      return res.data;
    });

  return res.data;
};

export function useCreateUpdateBook(id: string) {
  return useMutation({
    mutationFn: () => createUpdateBook(id),
  });
}
