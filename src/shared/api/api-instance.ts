import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { BACKEND_BASE_URL } from '../constants/backend-urls';
import { refreshTokensApi } from './user/refresh-tokens';

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
    timeout: 10000,
    withCredentials: false,
    headers: {
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
      return refreshToken(instance, originalRequest);
    }

    return Promise.reject(error);
  });

  return instance;
}

const refreshToken = async (instance: AxiosInstance, config: InternalAxiosRequestConfig<unknown>) => {
  if (isRefreshing) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {
      addSubscriber((token: string) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(instance(config));
      });
    });
  }

  (config as unknown as { _retry: boolean })._retry = true;
  isRefreshing = true;
  
  const token = localStorage.getItem('session');

  if (token) {
    const parsedToken = JSON.parse(token);

    try {
      const response = await refreshTokensApi(parsedToken.refreshToken);

      localStorage.setItem('session', JSON.stringify(response.data));
      onRefreshed(response.data.accessToken);

      return instance(config);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      localStorage.removeItem('session');
      window.location.reload();
    } finally {
      isRefreshing = false;
    }
  }
}