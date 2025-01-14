/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const returnTransaction = async (id: string) => {
    const res = await axiosClient
    .post(`/transactions/return/${id}`)
    .then((res: any) => {
      return res.data;
    });

  return res.data;
};

export function useReturnTransaction() {
  return useMutation({
    mutationFn: (id: string) => returnTransaction(id),
  });
}
