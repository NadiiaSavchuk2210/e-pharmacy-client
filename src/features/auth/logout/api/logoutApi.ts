import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/apiClient';

import { AUTH_ENDPOINTS } from '../../config/authEndpoints';
import { useClearAuthState } from '../../model/session/authState';

export const logoutUser = async () => {
  try {
    await apiClient.get(AUTH_ENDPOINTS.logout, {
      skipAuthRefresh: true,
    });
  } catch {
    // Local logout should still succeed if the server session is already gone.
  }
};

export const useLogoutMutation = () => {
  const clearAuthState = useClearAuthState();

  return useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      return clearAuthState();
    },
  });
};
