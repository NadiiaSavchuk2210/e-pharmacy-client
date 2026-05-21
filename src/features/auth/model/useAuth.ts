'use client';

import { useCurrentUserQuery } from './queries/currentUserQuery';
import { useAuthSessionRestore } from './session/authSessionRestore';
import { useAuthSessionStatus } from './session/useAuthSessionStatus';

export const useAuth = () => {
  const hasSession = useAuthSessionStatus();
  const { isCheckingSession } = useAuthSessionRestore();
  const currentUserQuery = useCurrentUserQuery();
  const isAuthenticated = hasSession && currentUserQuery.isSuccess;
  const user = isAuthenticated ? currentUserQuery.data : null;

  return {
    user,
    isAuthenticated,
    isAuthLoading:
      isCheckingSession ||
      (hasSession && (currentUserQuery.isLoading || currentUserQuery.isFetching)),
    isAuthError: currentUserQuery.isError,
    refetchCurrentUser: currentUserQuery.refetch,
  };
};
