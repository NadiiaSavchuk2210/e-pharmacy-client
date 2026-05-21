import { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

export const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  config.headers = AxiosHeaders.from(config.headers);
  config.headers.set('Authorization', `Bearer ${token}`);
};
