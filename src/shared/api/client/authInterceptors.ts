import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import { AUTH_REFRESH_PATH } from './apiClient.config';
import { setAuthorizationHeader } from './apiClient.headers';
import { refreshAccessToken, refreshAuthSession } from './authRefresh';
import {
  getAuthAccessToken,
  shouldRefreshAuthAccessToken,
} from '../session/authSession';

import type { RetryableRequestConfig } from './apiClient.types';

const isRefreshRequest = (config?: InternalAxiosRequestConfig) => {
  return Boolean(config?.url?.includes(AUTH_REFRESH_PATH));
};

export const attachAuthInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(
    async (config) => {
      if (!config.skipAuthRefresh && shouldRefreshAuthAccessToken()) {
        await refreshAuthSession();
      }

      if (config.skipAuthHeader) {
        return config;
      }

      const accessToken = getAuthAccessToken();

      if (accessToken) {
        setAuthorizationHeader(config, accessToken);
      }

      return config;
    },
    (error: unknown) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as RetryableRequestConfig | undefined;

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        originalRequest.skipAuthRefresh ||
        isRefreshRequest(originalRequest)
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const accessToken = await refreshAccessToken();
        setAuthorizationHeader(originalRequest, accessToken);

        return client(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    },
  );
};
