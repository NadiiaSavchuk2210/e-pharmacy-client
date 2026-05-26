'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import {
  clearAuthSession,
  persistAuthSession,
} from '@/shared/api/authSession';

import { authQueryKeys } from '../queries/authQueryKeys';

import type { AuthSessionWithUser } from './types';

export const useSaveAuthSession = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (session: AuthSessionWithUser) => {
      persistAuthSession(session);

      if (session.user) {
        queryClient.setQueryData(authQueryKeys.currentUser(), session.user);
      } else {
        queryClient.removeQueries({ queryKey: authQueryKeys.currentUser() });
      }
    },
    [queryClient],
  );
};

export const useClearAuthState = () => {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    clearAuthSession();
    await queryClient.cancelQueries({ queryKey: authQueryKeys.all });
    queryClient.removeQueries({ queryKey: authQueryKeys.all });
  }, [queryClient]);
};
