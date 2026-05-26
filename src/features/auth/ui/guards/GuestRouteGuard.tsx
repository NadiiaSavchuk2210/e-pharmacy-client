'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import AuthRouteLoader from './AuthRouteLoader';
import {
  AUTH_PRIVATE_REDIRECT_PATH,
  getSafeAuthRedirect,
} from '../../constants/routes';
import { useClearAuthState } from '../../model/session/authState';
import { useAuth } from '../../model/useAuth';

type GuestRouteGuardProps = {
  children: React.ReactNode;
};

const GuestRouteGuard = ({ children }: GuestRouteGuardProps) => {
  const { isAuthenticated, isAuthError, isAuthLoading } = useAuth();
  const clearAuthState = useClearAuthState();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isAuthenticated) return;

    const redirectPath = getSafeAuthRedirect(
      searchParams.get('redirect'),
      AUTH_PRIVATE_REDIRECT_PATH,
    );

    router.replace(redirectPath);
  }, [isAuthenticated, router, searchParams]);

  useEffect(() => {
    if (!isAuthError) return;

    void clearAuthState();
  }, [clearAuthState, isAuthError]);

  if (isAuthLoading || isAuthenticated) {
    return <AuthRouteLoader />;
  }

  return children;
};

export default GuestRouteGuard;
