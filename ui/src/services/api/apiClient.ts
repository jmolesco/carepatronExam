import axios, { AxiosRequestConfig, Method } from "axios";

const localServer = "http://localhost:37988/api";
const devServer = "http://janmarkolesco-001-site1.atempurl.com/api"
const API_URL = devServer;

export function apiGet<T>(uri: string): Promise<T> {
  console.log("url", uri);
  return api<T>(uri, "get", undefined);
}

export function apiDelete<T>(uri: string): Promise<T> {
  return api<T>(uri, "delete");
}

export function apiPost<T>(
  uri: string,
  data: any,
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> {
  return api<T>(uri, "post", data, onUploadProgress);
}

export function apiPut<T>(uri: string, data: any): Promise<T> {
  return api<T>(uri, "put", data);
}

export function apiPatch<T>(uri: string, data: any): Promise<T> {
  return api<T>(uri, "patch", data);
}

async function api<T>(
  uri: string,
  method: Method = "GET",
  data: any = null,
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> {
  return call(uri, method, data, onUploadProgress);
}

function call<T>(
  uri: string,
  method: Method = "GET",
  data: any = null,
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> {
  let request: AxiosRequestConfig = {
    url: `${API_URL}/${uri}`,
    //withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Headers': '*',
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT",
      "Content-Type": "application/json",
    },
    method,
    onUploadProgress,
  };

  if (data !== null) {
    request = {
      ...request,
      data,
    };
  }

  return axios(request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response);
    });
}

const apiClient = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete,
};

export default apiClient;
