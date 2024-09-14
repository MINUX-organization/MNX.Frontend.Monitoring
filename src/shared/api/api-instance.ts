import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_BASE_URL } from '../constants/backend-urls';
import { refreshAccessTokenApi } from './auth/refresh-access-token';

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
    const token = localStorage.getItem('session')
    
    if (token) {
      const parsedToken = JSON.parse(token)
      config.headers.Authorization = `Bearer ${parsedToken.accessToken}`
    }
  
    return config
  })

  instance.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const token = localStorage.getItem('session');

      if (token) {
        const parsedToken = JSON.parse(token);

        if (new Date(parsedToken.refreshExpiration).getTime() < Date.now()) {
          localStorage.removeItem('session');
          window.location.reload();
        }

        try {
          const response = await refreshAccessTokenApi(
            parsedToken.refreshToken
          );

          localStorage.setItem('session', JSON.stringify(response));

          return instance(originalRequest);
        } catch {
          localStorage.removeItem('session');
          window.location.reload();
        }
      }
    }

    return Promise.reject(error);
  });

  return instance;
}