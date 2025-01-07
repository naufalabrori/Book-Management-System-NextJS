/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteCategory = async (id: string) => {
  const res = await axiosClient
      .delete(`/categories?id=${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
};

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
  });
}