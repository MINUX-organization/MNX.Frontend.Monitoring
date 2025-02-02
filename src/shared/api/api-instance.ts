import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_BASE_URL } from '../constants/backend-urls';
import { refreshAccessTokenApi } from './auth/refresh-access-token';

export const IS_SUCCESS_STATUS = (status: number | object): boolean => {
  if (typeof(status) === 'number') {
    return status >= 200 && status < 300
  }

  if (typeof(status) !== 'undefined') {
    return true
  }

  return false;
}

let isRefreshing = false;
let subscribers: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
  subscribers.forEach(callback => callback(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

export function apiInstance(url?: string, customApiConfig?: AxiosRequestConfig): AxiosInstance {
  const apiConfig: AxiosRequestConfig = {
    baseURL: `${BACKEND_BASE_URL}${url ?? ''}`,
    timeout: 5000,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    ...customApiConfig
  };
  
  const instance = axios.create(apiConfig);

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('session');
    
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken.accessToken}`;
    }
  
    return config;
  });

  instance.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, _reject) => {
          addSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      const token = localStorage.getItem('session');

      if (token) {
        const parsedToken = JSON.parse(token);

        try {
          const response = await refreshAccessTokenApi(parsedToken.refreshToken);

          localStorage.setItem('session', JSON.stringify(response.data));
          onRefreshed(response.data.accessToken);

          return instance(originalRequest);
        } catch (err) {
          // localStorage.removeItem('session');
          // window.location.reload();
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  });

  return instance;
}