'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import AuthRouteLoader from './AuthRouteLoader';
import {
  AUTH_PRIVATE_REDIRECT_PATH,
  getSafeAuthRedirect,
} from '../../constants/routes';
import { useCurrentUserQuery } from '../../model/queries/currentUserQuery';
import { useAuthSessionRestore } from '../../model/session/authSessionRestore';
import { clearAuthState } from '../../model/session/authState';
import { useAuthSessionStatus } from '../../model/session/useAuthSessionStatus';

type GuestRouteGuardProps = {
  children: React.ReactNode;
};

const GuestRouteGuard = ({ children }: GuestRouteGuardProps) => {
  const hasSession = useAuthSessionStatus();
  const { isCheckingSession } = useAuthSessionRestore();
  const currentUserQuery = useCurrentUserQuery();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!hasSession || !currentUserQuery.isSuccess) return;

    const redirectPath = getSafeAuthRedirect(
      searchParams.get('redirect'),
      AUTH_PRIVATE_REDIRECT_PATH,
    );

    router.replace(redirectPath);
  }, [currentUserQuery.isSuccess, hasSession, router, searchParams]);

  useEffect(() => {
    if (!currentUserQuery.isError) return;

    clearAuthState(queryClient);
  }, [currentUserQuery.isError, queryClient]);

  if (isCheckingSession || (hasSession && !currentUserQuery.isError)) {
    return <AuthRouteLoader />;
  }

  return children;
};

export default GuestRouteGuard;
