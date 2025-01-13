/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "./type";

const createUpdateTransaction = async (data: Transaction, id?: number) => {
  if (id) {
    const res = await axiosClient
      .put(`/transactions/${id}`, data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  } else {
    const res = await axiosClient
      .post("/transactions", data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  }
};

export function useCreateUpdateTransaction(id?: number) {
  return useMutation({
    mutationFn: (data: any) => createUpdateTransaction(data, id),
  });
}
