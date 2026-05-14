import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

import { unwrapApiResponse, type ApiSuccessResponse } from './apiResponse';
import {
  clearAuthSession,
  getAuthAccessToken,
  persistAuthSession,
  type AuthSessionResponse,
} from './authSession';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
const AUTH_REFRESH_PATH =
  process.env.NEXT_PUBLIC_REFRESH_PATH ?? '/api/user/refresh';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshAccessTokenRequest: Promise<string> | null = null;

const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  config.headers = AxiosHeaders.from(config.headers);
  config.headers.set('Authorization', `Bearer ${token}`);
};

const isRefreshRequest = (config?: InternalAxiosRequestConfig) => {
  return Boolean(config?.url?.includes(AUTH_REFRESH_PATH));
};

const refreshAccessToken = async () => {
  if (!refreshAccessTokenRequest) {
    refreshAccessTokenRequest = refreshClient
      .post<ApiSuccessResponse<AuthSessionResponse> | AuthSessionResponse>(
        AUTH_REFRESH_PATH,
        null,
      )
      .then(({ data }) => {
        const session = unwrapApiResponse(data);
        const accessToken = session.token ?? session.accessToken;

        if (!accessToken) {
          throw new Error('Refresh response did not include an access token');
        }

        persistAuthSession(session);

        return accessToken;
      })
      .catch((error) => {
        clearAuthSession();
        throw error;
      })
      .finally(() => {
        refreshAccessTokenRequest = null;
      });
  }

  return refreshAccessTokenRequest;
};

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAuthAccessToken();

    if (accessToken) {
      setAuthorizationHeader(config, accessToken);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
  { synchronous: true },
);

apiClient.interceptors.response.use(
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
      isRefreshRequest(originalRequest)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      setAuthorizationHeader(originalRequest, accessToken);

      return apiClient(originalRequest);
    } catch {
      return Promise.reject(error);
    }
  },
);
