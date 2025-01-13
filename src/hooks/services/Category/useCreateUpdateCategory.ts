/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { Category } from "./type";

const createUpdateCategory = async (data: Category, id?: number) => {
  if (id) {
    const res = await axiosClient
      .put(`/categories/${id}`, data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  } else {
    const res = await axiosClient.post("/categories", data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateCategory(id?: number) {
  return useMutation({
    mutationFn: (data: any) => createUpdateCategory(data, id),
  });
}
