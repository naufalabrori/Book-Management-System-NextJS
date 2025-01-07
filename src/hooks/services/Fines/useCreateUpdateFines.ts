/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { Fines } from "./type";

const createUpdateFines = async (data: Fines, id: string) => {
  if (id) {
    const res = await axiosClient
      .put(`/fines/${id}`, data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  } else {
    const res = await axiosClient
      .post("/fines", data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  }
};

export function useCreateUpdateFines(id: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateFines(data, id),
  });
}
