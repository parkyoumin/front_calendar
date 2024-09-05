import axios, { AxiosRequestConfig } from "axios";
import isEmpty from "@/utils/validator";
import { cookies, headers } from "next/headers";
import Cookies from "js-cookie";

const cookieStore = cookies();
const accessToken = "Bearer " + cookieStore.get("access_token")?.value;
const refreshToken = cookieStore.get("refresh_token")?.value;
const providerAccountId = cookieStore.get("provider_account_id")?.value;

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: accessToken,
  },
  withCredentials: true,
});

export interface CommonResponse {
  status: number;
  data: any;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const data = {
        refreshToken,
        providerAccountId,
      };
      const refreshResponse = await post("/auth/refresh", data);
      console.log(refreshResponse.data);

      const newAccessToken = refreshResponse.data.accessToken;
      const newRefreshToken = refreshResponse.data.refreshToken;

      error.config.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  },
);

const get = async (
  url: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse> => {
  const getData: CommonResponse = { status: 0, data: {} };
  return await axiosInstance
    .get(url, config)
    .then((response) => {
      if (response.data.status >= 200 && response.data.status < 400) {
        getData.status = response.data.status;
        getData.data = response.data.data;
        return getData;
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      [getData.status, getData.data] = isEmpty(error.response)
        ? [500, error.message]
        : [error.response.status, error.response.data];
      return getData;
    });
};

const post = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse> => {
  const getData: CommonResponse = { status: 0, data: {} };
  return await axiosInstance
    .post(url, data, config)
    .then((response) => {
      if (response.data.status >= 200 && response.data.status < 400) {
        // ssr cookie set
        if (typeof window === "undefined") {
          let accessToken = "";
          let refreshToken = "";
          response.headers["set-cookie"]?.forEach((cookieString) => {
            if (cookieString.startsWith("access_token=")) {
              accessToken = cookieString.split(";")[0].split("=")[1];
            }
            if (cookieString.startsWith("refresh_token=")) {
              refreshToken = cookieString.split(";")[0].split("=")[1];
            }
          });
          console.log(accessToken);

          Cookies.set("access_token", accessToken);
        }

        getData.status = response.data.status;
        getData.data = response.data.data;
        return getData;
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      [getData.status, getData.data] = isEmpty(error.response)
        ? [500, error.message]
        : [error.response.status, error.response.data];

      return getData;
    });
};

const put = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse> => {
  const getData: CommonResponse = { status: 0, data: {} };
  return await axiosInstance
    .put(url, data, config)
    .then((response) => {
      if (response.data.status >= 200 && response.data.status < 400) {
        getData.status = response.data.status;
        getData.data = response.data.data;
        return getData;
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      [getData.status, getData.data] = isEmpty(error.response)
        ? [500, error.message]
        : [error.response.status, error.response.content];
      return getData;
    });
};

const del = async (
  url: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse> => {
  const getData: CommonResponse = { status: 0, data: {} };
  return await axiosInstance
    .delete(url, config)
    .then((response) => {
      if (response.data.status >= 200 && response.data.status < 400) {
        getData.status = response.data.status;
        getData.data = response.data.data;
        return getData;
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      [getData.status, getData.data] = isEmpty(error.response)
        ? [500, error.message]
        : [error.response.status, error.response.data];
      return getData;
    });
};

export { get, post, put, del };
