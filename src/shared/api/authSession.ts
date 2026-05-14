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
const LEGACY_LOCAL_STORAGE_KEYS = [
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRES_AT_KEY,
];
const SENSITIVE_SESSION_STORAGE_KEYS = [
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRES_AT_KEY,
];

let authAccessToken: string | null = null;

const isBrowser = () => typeof window !== 'undefined';

const notifyAuthSessionChange = () => {
  if (!isBrowser()) return;

  window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
};

const clearLegacyAuthStorage = () => {
  if (!isBrowser()) return;

  LEGACY_LOCAL_STORAGE_KEYS.forEach((key) => {
    window.localStorage.removeItem(key);
  });

  SENSITIVE_SESSION_STORAGE_KEYS.forEach((key) => {
    window.sessionStorage.removeItem(key);
  });
};

const readStoredAccessToken = () => {
  if (!isBrowser()) return null;

  return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

clearLegacyAuthStorage();
authAccessToken = readStoredAccessToken();

export const getAuthAccessToken = () => authAccessToken;

export const hasAuthSession = () => Boolean(getAuthAccessToken());

export const persistAuthSession = (data: AuthSessionResponse) => {
  if (!isBrowser()) return;

  const accessToken = data.token ?? data.accessToken;

  authAccessToken = accessToken ?? null;
  clearLegacyAuthStorage();

  if (accessToken) {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } else {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  notifyAuthSessionChange();
};

export const clearAuthSession = () => {
  if (!isBrowser()) return;

  authAccessToken = null;
  clearLegacyAuthStorage();
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  notifyAuthSessionChange();
};

export const AUTH_SESSION_CHANGE = AUTH_SESSION_CHANGE_EVENT;
