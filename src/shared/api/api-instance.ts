import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_BASE_URL } from '../constants/backend-urls';
import { refreshTokensApi } from './user/refresh-tokens';

type RefreshState = {
  isRefreshing: boolean;
  subscribers: ((token: string | null) => void)[];
};

const refreshStates = new WeakMap<AxiosInstance, RefreshState>();

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
  refreshStates.set(instance, { isRefreshing: false, subscribers: [] });

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('session');
    
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        config.headers.Authorization = `Bearer ${parsedToken.accessToken}`;
      } catch (error) {
        console.error('Error parsing session token:', error);
        localStorage.removeItem('session');
      }
    }
  
    return config;
  });

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      const state = refreshStates.get(instance)!;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (state.isRefreshing) {
          return new Promise((resolve, reject) => {
            state.subscribers.push(newToken => {
              if (!newToken) return reject(error);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(instance(originalRequest));
            });
          });
        }

        state.isRefreshing = true;
        originalRequest._retry = true;

        try {
          const token = localStorage.getItem('session');
          if (!token) throw new Error('No session token');

          const parsedToken = JSON.parse(token);
          const response = await refreshTokensApi(parsedToken.refreshToken);

          localStorage.setItem('session', JSON.stringify(response.data));
          state.subscribers.forEach(callback => callback(response.data.accessToken));
          state.subscribers = [];
          
          return instance(originalRequest);
        } catch (error) {
          console.error('Error refreshing token:', error);
          localStorage.removeItem('session');
          state.subscribers.forEach(callback => callback(null));
          window.location.href = '/login';
          return Promise.reject(error);
        } finally {
          state.isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}