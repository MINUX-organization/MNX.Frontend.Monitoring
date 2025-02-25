import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_BASE_URL } from '../constants/backend-urls';
import { refreshTokensApi } from './user/refresh-tokens';
import { TokenRefresher } from '../lib/utils/refresh-token';

const shouldSkipAuthCheck = (url: string): boolean => {
  const AUTH_ROUTE_PREFIX = 'api/auth/';
  const AUTH_EXCEPTIONS = [
    'api/auth/user/changePassword'
  ];

  const isAuthRoute = url.includes(AUTH_ROUTE_PREFIX);
  const isException = AUTH_EXCEPTIONS.some(exception => url.includes(exception));

  return isAuthRoute && !isException;
}; 

export function apiInstance(url?: string, customApiConfig?: AxiosRequestConfig): AxiosInstance {
  const tokenRefresher = TokenRefresher.getInstance();

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

  instance.interceptors.request.use(async (config) => { 
    const url = config.url?.replace(config.baseURL || '', '') || '';

    if (shouldSkipAuthCheck(url)) {
      return config;
    }

    const token = JSON.parse(localStorage.getItem('session')!);

    await tokenRefresher.checkAndRefresh(
      token.accessToken,
      token.refreshToken,
      refreshTokensApi,
      (data) => {
        localStorage.setItem('session', JSON.stringify(data));
      },
      () => {
        localStorage.removeItem('session');
        window.location.reload();
      }
    ).then(() => {
      config.headers.Authorization = 
        `Bearer ${JSON.parse(localStorage.getItem('session')!).accessToken}`;
    })
    
    return config;
  });

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return tokenRefresher.refreshToken(
          refreshTokensApi,
          JSON.parse(localStorage.getItem('session')!).refreshToken,
          (data) => {
            localStorage.setItem('session', JSON.stringify(data));
            instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          },
          () => {
            localStorage.removeItem('session');
            window.location.reload();
          }
        ).then(() => instance(originalRequest));
      }
      return Promise.reject(error);
    }
  );

  return instance;
}