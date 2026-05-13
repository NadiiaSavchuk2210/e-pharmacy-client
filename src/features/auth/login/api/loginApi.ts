import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/apiClient';

import { normalizeLoginError } from './loginError';
import { type LoginResponse } from './loginTypes';
import { type LoginFormValues } from '../model/loginSchema';

const LOGIN_PATH = process.env.NEXT_PUBLIC_LOGIN_PATH ?? '/api/user/login';

export const loginUser = async (values: LoginFormValues) => {
  try {
    const { data } = await apiClient.post<LoginResponse>(LOGIN_PATH, values);

    return data;
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
