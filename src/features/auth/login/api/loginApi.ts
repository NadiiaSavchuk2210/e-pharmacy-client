import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/apiClient';
import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '@/shared/api/apiResponse';

import { normalizeLoginError } from './loginError';
import { type LoginResponse } from './loginTypes';
import { type LoginFormValues } from '../model/loginSchema';

const LOGIN_PATH = process.env.NEXT_PUBLIC_LOGIN_PATH ?? '/api/user/login';

export const loginUser = async (values: LoginFormValues) => {
  try {
    const { data } = await apiClient.post<
      ApiSuccessResponse<LoginResponse> | LoginResponse
    >(LOGIN_PATH, values);

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
