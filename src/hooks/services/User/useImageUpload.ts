/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

const imageUpload = async (id: number, data: any) => {
  const res = await axiosClient
    .post("users/images/" + id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res: any) => {
      return res.data;
    });

  return res.data;
};

export function useImageUpload(id: number) {
  return useMutation({
    mutationFn: (data: any) => imageUpload(id, data),
  });
}
