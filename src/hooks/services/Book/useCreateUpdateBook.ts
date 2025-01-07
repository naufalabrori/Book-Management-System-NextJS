/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { Book } from "./type";

const createUpdateBook = async (data: Book, id: string) => {
  if (id) {
    const res = await axiosClient
      .put(`/books/${id}`, data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  } else {
    const res = await axiosClient
      .post("/books", data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  }
};

export function useCreateUpdateBook(id: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateBook(data, id),
  });
}
