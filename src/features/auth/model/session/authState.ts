import type { User } from '@/entities/user';
import {
  clearAuthSession,
  persistAuthSession,
  type AuthTokenPayload,
} from '@/shared/api/authSession';

import { authQueryKeys } from '../queries/authQueryKeys';

import type { QueryClient } from '@tanstack/react-query';

type AuthSessionWithUser = AuthTokenPayload & {
  user?: User;
};

export const saveAuthSession = (
  queryClient: QueryClient,
  session: AuthSessionWithUser,
) => {
  persistAuthSession(session);

  if (session.user) {
    queryClient.setQueryData(authQueryKeys.currentUser(), session.user);
  }
};

export const clearAuthState = (queryClient: QueryClient) => {
  clearAuthSession();
  queryClient.removeQueries({ queryKey: authQueryKeys.all });
};
