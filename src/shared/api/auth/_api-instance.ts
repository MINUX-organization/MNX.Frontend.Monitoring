import { BACKEND_SECURITY_URL } from "@/shared/constants/backend-urls";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export function apiInstance(customApiConfig?: AxiosRequestConfig): AxiosInstance {
  const apiConfig: AxiosRequestConfig = {
    baseURL: BACKEND_SECURITY_URL,
    timeout: 5000,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    ...customApiConfig
  };
  
  return axios.create(apiConfig);
}