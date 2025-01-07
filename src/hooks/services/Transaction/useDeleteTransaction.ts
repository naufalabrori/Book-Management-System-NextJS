/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteTransaction = async (id: string) => {
  const res = await axiosClient
      .delete(`/transactions/${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
};

export function useDeleteTransaction() {
  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
  });
}