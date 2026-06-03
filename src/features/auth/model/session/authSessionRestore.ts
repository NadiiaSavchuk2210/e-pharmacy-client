'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { refreshAuthSession } from '@/shared/api/apiClient';
import {
  hasAuthAccessToken,
  hasAuthSessionRestoreHint,
} from '@/shared/api/authSession';

import { useClearAuthState } from './authState';
import { useAuthSessionStatus } from './useAuthSessionStatus';

type AuthSessionRestoreStatus = 'idle' | 'pending' | 'settled';

const listeners = new Set<() => void>();

let restoreStatus: AuthSessionRestoreStatus = 'idle';
let restoreRequest: Promise<void> | null = null;

const emitAuthSessionRestoreChange = () => {
  listeners.forEach((listener) => listener());
};

const setAuthSessionRestoreStatus = (status: AuthSessionRestoreStatus) => {
  restoreStatus = status;
  emitAuthSessionRestoreChange();
};

const subscribeToAuthSessionRestore = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getAuthSessionRestoreStatus = () => restoreStatus;

const getServerAuthSessionRestoreStatus = (): AuthSessionRestoreStatus => 'idle';

const restoreAuthSessionOnce = () => {
  if (restoreStatus === 'settled') {
    return Promise.resolve();
  }

  if (!restoreRequest) {
    setAuthSessionRestoreStatus('pending');

    restoreRequest = refreshAuthSession()
      .then(() => undefined)
      .finally(() => {
        setAuthSessionRestoreStatus('settled');
      });
  }

  return restoreRequest;
};

export const useAuthSessionRestore = (enabled = true) => {
  const hasSession = useAuthSessionStatus();
  const clearAuthState = useClearAuthState();
  const status = useSyncExternalStore(
    subscribeToAuthSessionRestore,
    getAuthSessionRestoreStatus,
    getServerAuthSessionRestoreStatus,
  );

  useEffect(() => {
    if (!enabled || status !== 'idle') return;
    if (hasSession) {
      setAuthSessionRestoreStatus('settled');
      return;
    }

    if (hasAuthAccessToken()) {
      setAuthSessionRestoreStatus('settled');
      return;
    }

    if (!hasAuthSessionRestoreHint()) {
      setAuthSessionRestoreStatus('settled');
      return;
    }

    restoreAuthSessionOnce().catch(() => {
      if (hasAuthAccessToken()) return;

      void clearAuthState();
    });
  }, [clearAuthState, enabled, hasSession, status]);

  return {
    hasTriedSessionRestore: status === 'settled',
    isCheckingSession: enabled && !hasSession && status !== 'settled',
    isRestoringSession: status === 'pending',
  };
};
