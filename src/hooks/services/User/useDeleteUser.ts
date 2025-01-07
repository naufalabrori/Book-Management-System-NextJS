/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteUser = async (id: string) => {
  const res = await axiosClient
      .delete(`/users/${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
};

export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
  });
}