import { apiClient } from '@/shared/api/apiClient';
import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '@/shared/api/apiResponse';

import type { User } from '../model/types';

const CURRENT_USER_PATH =
  process.env.NEXT_PUBLIC_CURRENT_USER_PATH ?? '/api/user/profile';

export const getCurrentUser = async (signal?: AbortSignal): Promise<User> => {
  const { data } = await apiClient.get<ApiSuccessResponse<User> | User>(
    CURRENT_USER_PATH,
    { signal },
  );

  return unwrapApiResponse(data);
};
