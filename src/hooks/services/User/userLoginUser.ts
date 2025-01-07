/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { UserLogin, UserLoginResponse } from "./type";

const createUpdateBook = async (
  data: UserLogin
): Promise<UserLoginResponse> => {
  const res = await axiosClient.post("users/login", data).then((res: any) => {
    return res.data;
  });

  return res.data;
};

export function useCreateUpdateBook() {
  return useMutation({
    mutationFn: (data: UserLogin) => createUpdateBook(data),
  });
}
