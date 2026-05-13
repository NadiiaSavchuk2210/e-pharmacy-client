import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/apiClient';
import { clearAuthSession, getAuthAccessToken } from '@/shared/api/authSession';

const LOGOUT_PATH = process.env.NEXT_PUBLIC_LOGOUT_PATH ?? '/api/user/logout';

export const logoutUser = async () => {
  const accessToken = getAuthAccessToken();

  try {
    if (accessToken) {
      await apiClient.post(LOGOUT_PATH);
    }
  } catch {
    // Local logout should still succeed if the server session is already gone.
  } finally {
    clearAuthSession();
  }
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
