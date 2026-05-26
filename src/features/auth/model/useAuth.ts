'use client';

import { useCurrentUserQuery } from './queries/currentUserQuery';
import { useAuthSessionRestore } from './session/authSessionRestore';
import { useAuthSessionStatus } from './session/useAuthSessionStatus';

export const useAuth = () => {
  const hasSession = useAuthSessionStatus();
  const { hasTriedSessionRestore, isCheckingSession } =
    useAuthSessionRestore();
  const currentUserQuery = useCurrentUserQuery();
  const isAuthenticated = hasSession && currentUserQuery.isSuccess;

  return {
    user: isAuthenticated ? currentUserQuery.data : null,
    hasSession,
    hasTriedSessionRestore,
    isAuthenticated,
    isAuthLoading: isCheckingSession || (hasSession && currentUserQuery.isLoading),
    isAuthError: currentUserQuery.isError,
    refetchCurrentUser: currentUserQuery.refetch,
  };
};
