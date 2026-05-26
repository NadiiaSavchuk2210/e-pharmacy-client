'use client';

import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/entities/user';
import { FIVE_MINUTES_MS } from '@/shared/constants/time';

import { authQueryKeys } from './authQueryKeys';
import { useAuthSessionStatus } from '../session/useAuthSessionStatus';

export const useCurrentUserQuery = () => {
  const hasSession = useAuthSessionStatus();

  return useQuery({
    queryKey: authQueryKeys.currentUser(),
    queryFn: ({ signal }) => getCurrentUser(signal),
    enabled: hasSession,
    retry: false,
    staleTime: FIVE_MINUTES_MS,
  });
};
