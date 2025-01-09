/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { User } from "./type";

const createUpdateUser = async (data: User, id: number) => {
  if (id) {
    const res = await axiosClient
      .put(`/users/${id}`, data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  } else {
    const res = await axiosClient
      .post("/users", data)
      .then((res: any) => {
        return res.data;
      });

    return res.data;
  }
};

export function useCreateUpdateUser(id: number) {
  return useMutation({
    mutationFn: (data: any) => createUpdateUser(data, id),
  });
}
