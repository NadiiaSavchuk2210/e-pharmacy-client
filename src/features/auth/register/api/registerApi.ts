import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/apiClient';

import { normalizeRegisterError } from './registerError';
import { type RegisterResponse } from './registerTypes';
import { type RegisterFormValues } from '../model/registerSchema';

const REGISTER_PATH =
  process.env.NEXT_PUBLIC_REGISTER_PATH ?? '/api/user/register';

export const registerUser = async (values: RegisterFormValues) => {
  try {
    const { data } = await apiClient.post<RegisterResponse>(
      REGISTER_PATH,
      values,
    );

    return data;
  } catch (error) {
    throw normalizeRegisterError(error);
  }
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export { RegisterApiError } from './registerError';
