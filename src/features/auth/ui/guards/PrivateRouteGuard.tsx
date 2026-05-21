'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import AuthRouteLoader from './AuthRouteLoader';
import {
  getLoginRedirectHref,
  getSafeAuthRedirect,
} from '../../constants/routes';
import { useCurrentUserQuery } from '../../model/queries/currentUserQuery';
import { useAuthSessionRestore } from '../../model/session/authSessionRestore';
import { clearAuthState } from '../../model/session/authState';
import { useAuthSessionStatus } from '../../model/session/useAuthSessionStatus';

type PrivateRouteGuardProps = {
  children: React.ReactNode;
};

const getCurrentHref = (pathname: string, searchParams: URLSearchParams) => {
  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
};

const PrivateRouteGuard = ({ children }: PrivateRouteGuardProps) => {
  const hasSession = useAuthSessionStatus();
  const { hasTriedSessionRestore, isCheckingSession } =
    useAuthSessionRestore();
  const currentUserQuery = useCurrentUserQuery();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (hasSession || isCheckingSession || !hasTriedSessionRestore) return;

    router.replace(getLoginRedirectHref(getCurrentHref(pathname, searchParams)));
  }, [
    hasSession,
    hasTriedSessionRestore,
    isCheckingSession,
    pathname,
    router,
    searchParams,
  ]);

  useEffect(() => {
    if (!currentUserQuery.isError) return;

    clearAuthState(queryClient);
    router.replace(
      getLoginRedirectHref(
        getSafeAuthRedirect(getCurrentHref(pathname, searchParams), pathname),
      ),
    );
  }, [
    currentUserQuery.isError,
    pathname,
    queryClient,
    router,
    searchParams,
  ]);

  if (
    isCheckingSession ||
    !hasSession ||
    currentUserQuery.isLoading ||
    !currentUserQuery.isSuccess
  ) {
    return <AuthRouteLoader />;
  }

  return children;
};

export default PrivateRouteGuard;
