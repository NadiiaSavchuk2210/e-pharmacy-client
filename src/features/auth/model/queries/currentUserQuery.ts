'use client';

import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/entities/user';

import { authQueryKeys } from './authQueryKeys';
import { useAuthSessionStatus } from '../session/useAuthSessionStatus';

export const useCurrentUserQuery = () => {
  const hasSession = useAuthSessionStatus();

  return useQuery({
    queryKey: authQueryKeys.currentUser(),
    queryFn: getCurrentUser,
    enabled: hasSession,
    retry: false,
    staleTime: 5 * 60_000,
  });
};
