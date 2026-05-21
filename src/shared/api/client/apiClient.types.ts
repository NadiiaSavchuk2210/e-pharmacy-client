import type { InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthHeader?: boolean;
    skipAuthRefresh?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    skipAuthHeader?: boolean;
    skipAuthRefresh?: boolean;
  }
}

export type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
