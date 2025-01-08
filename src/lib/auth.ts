import Cookies from "universal-cookie";
import { User } from "@/hooks/services/User/type";
import { USER_COOKIES_KEY, AUTH_COOKIES_KEY } from "@/lib/constant";

const cookies = new Cookies();

export const setLoginData = (data: User, token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  cookies.set(AUTH_COOKIES_KEY, token, {
    sameSite: "none",
    secure: true,
    path: "/",
    expires: expires,
  });

  cookies.set(USER_COOKIES_KEY, data, {
    sameSite: "none",
    secure: true,
    path: "/",
    expires: expires,
  });
};

export const getLoginData = (): User => {
  return cookies.get(USER_COOKIES_KEY);
};

export const logout = () => {
  cookies.remove(AUTH_COOKIES_KEY, { path: "/" });
  cookies.remove(USER_COOKIES_KEY, { path: "/" });
};
