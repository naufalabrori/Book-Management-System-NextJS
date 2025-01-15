/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { HeadersDefaults } from "axios";
import Cookies from "universal-cookie";
import { AUTH_COOKIES_KEY, USER_COOKIES_KEY } from "./constant";

const axiosClient: any = axios.create();
const cookies = new Cookies();

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

type headers = {
  "Content-Type": string;
  Accept: string;
  Authorization: string;
};

axiosClient.defaults.withCredentials = false;

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as headers & HeadersDefaults;


axiosClient.interceptors.request.use(
  (config: any) => {
    const authToken = cookies.get(AUTH_COOKIES_KEY);

    if (authToken) {
      config.headers["Authorization"] = "Bearer " + authToken;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      cookies.remove(USER_COOKIES_KEY, { path: "/" });
      cookies.remove(AUTH_COOKIES_KEY, { path: "/" });
    }
    throw error;
  }
);

export default axiosClient;
