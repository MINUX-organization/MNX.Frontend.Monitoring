import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from '../constants/backend-urls';

export function apiInstance(customApiConfig?: AxiosRequestConfig): AxiosInstance {
  const apiConfig: AxiosRequestConfig = {
    baseURL: `${BACKEND_URL}/api`,
    timeout: 5000,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    ...customApiConfig
  };
  
  return axios.create(apiConfig);
}