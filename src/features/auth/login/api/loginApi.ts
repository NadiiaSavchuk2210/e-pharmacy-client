import { useMutation } from '@tanstack/react-query';

import { publicApiClient } from '@/shared/api/apiClient';
import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '@/shared/api/apiResponse';

import { normalizeLoginError } from './loginError';
import { type LoginResponse } from './loginTypes';
import { AUTH_ENDPOINTS } from '../../config/authEndpoints';
import { type LoginFormValues } from '../model/loginSchema';

export const loginUser = async (values: LoginFormValues) => {
  try {
    const { data } = await publicApiClient.post<
      ApiSuccessResponse<LoginResponse> | LoginResponse
    >(AUTH_ENDPOINTS.login, values);

    return unwrapApiResponse(data);
  } catch (error) {
    throw normalizeLoginError(error);
  }
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export { LoginApiError } from './loginError';
