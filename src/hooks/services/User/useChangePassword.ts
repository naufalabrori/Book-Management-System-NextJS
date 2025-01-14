/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { ChangePassword, UserLogin, UserLoginResponse } from "./type";

const changePassword = async (id: number, data: ChangePassword) => {
  const res = await axiosClient
    .post("users/change-password/" + id, data)
    .then((res: any) => {
      return res.data;
    });

  return res.data;
};

export function useChangePassword(id: number) {
  return useMutation({
    mutationFn: (data: ChangePassword) => changePassword(id, data),
  });
}
