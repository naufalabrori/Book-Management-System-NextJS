/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteBook = async (id: string) => {
  const res = await axiosClient
      .delete(`/books/${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
};

export function useDeleteBook() {
  return useMutation({
    mutationFn: (id: string) => deleteBook(id),
  });
}