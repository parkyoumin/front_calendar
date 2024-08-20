import axios, { AxiosRequestConfig } from "axios";
import isEmpty from "@/app/utils/validator";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const accessToken = localStorage.getItem("access_token");
// const axiosInstance = axios.create({
//   baseURL: apiUrl,
//   headers: { Authorization: accessToken },
// });

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export interface CommonResponse {
  status: number;
  comment?: string;
  data: any;
}

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
