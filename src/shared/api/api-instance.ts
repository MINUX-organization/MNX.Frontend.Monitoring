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
    },
    ...customApiConfig
  };
  
  const instance = axios.create(apiConfig);

  // Add access token to every request
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('session')
    
    if (token) {
      const parsedToken = JSON.parse(token)
      config.headers.Authorization = `Bearer ${parsedToken.access_token}`
    }
  
    return config
  })

  return instance;
}