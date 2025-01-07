/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { HeadersDefaults } from "axios";
import Cookies from "universal-cookie";
import { AUTH_COOKIES_KEY, LOGIN_COOKIES_KEY } from "./constant";

const axiosClient: any = axios.create();
const cookies = new Cookies();

axiosClient.defaults.baseURL = process.env.API_URL;

type headers = {
  "Content-Type": string;
  Accept: string;
  Authorization: string;
}

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as headers & HeadersDefaults;

axiosClient.interceptors.request.use(
  (config: any) => {
    const token = cookies.get(AUTH_COOKIES_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      cookies.remove(LOGIN_COOKIES_KEY, { path: "/" });
      cookies.remove(AUTH_COOKIES_KEY, { path: "/" });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
