import {
  dispatchBrowserEvent,
  getBrowserGlobal,
  isBrowser,
  removeStorageItems,
} from './authSession.helpers';

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

clearLegacyAuthStorage();
authAccessToken = readStoredAccessToken();

export const getAuthAccessToken = () => authAccessToken;

export const hasAuthSession = () => Boolean(getAuthAccessToken());

export const persistAuthSession = (data: AuthSessionResponse) => {
  if (!isBrowser()) return;

  const accessToken = data.token ?? data.accessToken;

  authAccessToken = accessToken ?? null;
  clearLegacyAuthStorage();

  const browserGlobal = getBrowserGlobal();

  if (accessToken) {
    browserGlobal.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
  } else {
    browserGlobal.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
  }

  notifyAuthSessionChange();
};

export const clearAuthSession = () => {
  if (!isBrowser()) return;

  authAccessToken = null;
  clearLegacyAuthStorage();
  getBrowserGlobal().sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
  notifyAuthSessionChange();
};

export const AUTH_SESSION_CHANGE = AUTH_SESSION_CHANGE_EVENT;
