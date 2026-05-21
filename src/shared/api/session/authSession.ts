import {
  dispatchBrowserEvent,
  getBrowserGlobal,
  isBrowser,
  removeStorageItems,
} from './authSession.helpers';

export type AuthTokenPayload = {
  token?: string;
  accessToken?: string;
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
];

let authAccessToken: string | null = null;
let authAccessTokenExpiresAt: number | null = null;

const notifyAuthSessionChange = () => {
  dispatchBrowserEvent(AUTH_SESSION_CHANGE_EVENT);
};

const clearLegacyAuthStorage = () => {
  if (!isBrowser()) return;

  const browserGlobal = getBrowserGlobal();

  removeStorageItems(browserGlobal.localStorage, LEGACY_LOCAL_STORAGE_KEYS);
  removeStorageItems(
    browserGlobal.sessionStorage,
    SENSITIVE_SESSION_STORAGE_KEYS,
  );
};

const readStoredAccessToken = () => {
  if (!isBrowser()) return null;

  return getBrowserGlobal().sessionStorage?.getItem(ACCESS_TOKEN_KEY) ?? null;
};

const readStoredAccessTokenExpiresAt = () => {
  if (!isBrowser()) return null;

  const value = getBrowserGlobal().sessionStorage?.getItem(
    ACCESS_TOKEN_EXPIRES_AT_KEY,
  );

  if (!value) return null;

  const expiresAt = Number.parseInt(value, 10);

  return Number.isNaN(expiresAt) ? null : expiresAt;
};

clearLegacyAuthStorage();
authAccessToken = readStoredAccessToken();
authAccessTokenExpiresAt = readStoredAccessTokenExpiresAt();

export const getAuthAccessToken = () => authAccessToken;

export const getAuthAccessTokenExpiresAt = () => authAccessTokenExpiresAt;

export const hasAuthSession = () => Boolean(getAuthAccessToken());

export const getAuthTokenFromPayload = (data: AuthTokenPayload) =>
  data.token ?? data.accessToken ?? null;

export const isAuthSessionExpired = () => {
  if (!authAccessTokenExpiresAt) return false;

  return authAccessTokenExpiresAt <= Date.now();
};

export const shouldRefreshAuthSession = (refreshLeewayMs = 30_000) => {
  if (!authAccessToken || !authAccessTokenExpiresAt) return false;

  return authAccessTokenExpiresAt - Date.now() <= refreshLeewayMs;
};

export const persistAuthSession = (data: AuthTokenPayload) => {
  if (!isBrowser()) return;

  const accessToken = getAuthTokenFromPayload(data);
  const expiresAt = data.expiresIn
    ? Date.now() + data.expiresIn * 1000
    : null;

  authAccessToken = accessToken ?? null;
  authAccessTokenExpiresAt = expiresAt;
  clearLegacyAuthStorage();

  const browserGlobal = getBrowserGlobal();

  if (accessToken) {
    browserGlobal.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
  } else {
    browserGlobal.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
  }

  if (expiresAt) {
    browserGlobal.sessionStorage?.setItem(
      ACCESS_TOKEN_EXPIRES_AT_KEY,
      String(expiresAt),
    );
  } else {
    browserGlobal.sessionStorage?.removeItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
  }

  notifyAuthSessionChange();
};

export const clearAuthSession = () => {
  if (!isBrowser()) return;

  authAccessToken = null;
  authAccessTokenExpiresAt = null;
  clearLegacyAuthStorage();
  getBrowserGlobal().sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
  getBrowserGlobal().sessionStorage?.removeItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
  notifyAuthSessionChange();
};

export const AUTH_SESSION_CHANGE = AUTH_SESSION_CHANGE_EVENT;
