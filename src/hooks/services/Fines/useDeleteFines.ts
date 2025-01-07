/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteFines = async (id: string) => {
  const res = await axiosClient
      .delete(`/Fines/${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
};

export function useDeleteFines() {
  return useMutation({
    mutationFn: (id: string) => deleteFines(id),
  });
}