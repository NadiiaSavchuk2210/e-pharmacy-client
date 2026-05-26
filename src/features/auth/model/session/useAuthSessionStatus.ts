'use client';

import { useSyncExternalStore } from 'react';

import {
  AUTH_SESSION_CHANGE,
  hasAuthAccessToken,
} from '@/shared/api/authSession';

const subscribeToAuthSession = (onStoreChange: () => void) => {
  window.addEventListener(AUTH_SESSION_CHANGE, onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return () => {
    window.removeEventListener(AUTH_SESSION_CHANGE, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
};

export const useAuthSessionStatus = () =>
  useSyncExternalStore(subscribeToAuthSession, hasAuthAccessToken, () => false);
