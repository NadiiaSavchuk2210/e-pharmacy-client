export type AuthSessionResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: 'Bearer';
  expiresIn?: number;
};

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_EXPIRES_AT_KEY = 'accessTokenExpiresAt';
const AUTH_SESSION_CHANGE_EVENT = 'auth-session-change';

const isBrowser = () => typeof window !== 'undefined';

const notifyAuthSessionChange = () => {
  if (!isBrowser()) return;

  window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
};

export const getAuthAccessToken = () => {
  if (!isBrowser()) return null;

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getAuthRefreshToken = () => {
  if (!isBrowser()) return null;

  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const hasAuthSession = () => Boolean(getAuthAccessToken());

export const persistAuthSession = (data: AuthSessionResponse) => {
  if (!isBrowser()) return;

  const accessToken = data.token ?? data.accessToken;

  if (accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (data.refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  }

  if (data.expiresIn && accessToken) {
    window.localStorage.setItem(
      ACCESS_TOKEN_EXPIRES_AT_KEY,
      String(Date.now() + data.expiresIn * 1000),
    );
  }

  notifyAuthSessionChange();
};

export const clearAuthSession = () => {
  if (!isBrowser()) return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
  notifyAuthSessionChange();
};

export const AUTH_SESSION_CHANGE = AUTH_SESSION_CHANGE_EVENT;
