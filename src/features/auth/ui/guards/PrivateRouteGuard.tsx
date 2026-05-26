'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import AuthRouteLoader from './AuthRouteLoader';
import {
  getLoginRedirectHref,
  getSafeAuthRedirect,
} from '../../constants/routes';
import { useClearAuthState } from '../../model/session/authState';
import { useAuth } from '../../model/useAuth';

type PrivateRouteGuardProps = {
  children: React.ReactNode;
};

const getCurrentHref = (pathname: string, searchParams: URLSearchParams) => {
  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
};

const PrivateRouteGuard = ({ children }: PrivateRouteGuardProps) => {
  const {
    hasSession,
    hasTriedSessionRestore,
    isAuthenticated,
    isAuthError,
    isAuthLoading,
  } = useAuth();
  const clearAuthState = useClearAuthState();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (hasSession || isAuthLoading || !hasTriedSessionRestore) return;

    router.replace(getLoginRedirectHref(getCurrentHref(pathname, searchParams)));
  }, [
    hasSession,
    hasTriedSessionRestore,
    isAuthLoading,
    pathname,
    router,
    searchParams,
  ]);

  useEffect(() => {
    if (!isAuthError) return;

    void clearAuthState();
    router.replace(
      getLoginRedirectHref(
        getSafeAuthRedirect(getCurrentHref(pathname, searchParams), pathname),
      ),
    );
  }, [
    clearAuthState,
    isAuthError,
    pathname,
    router,
    searchParams,
  ]);

  if (isAuthLoading || !hasSession || !isAuthenticated) {
    return <AuthRouteLoader />;
  }

  return children;
};

export default PrivateRouteGuard;
