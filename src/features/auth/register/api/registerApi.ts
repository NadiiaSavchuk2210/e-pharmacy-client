import { useMutation } from '@tanstack/react-query';

import { publicApiClient } from '@/shared/api/apiClient';
import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '@/shared/api/apiResponse';

import { normalizeRegisterError } from './registerError';
import { type RegisterResponse } from './registerTypes';
import { AUTH_ENDPOINTS } from '../../config/authEndpoints';
import { type RegisterFormValues } from '../model/registerSchema';

export const registerUser = async (values: RegisterFormValues) => {
  try {
    const { data } = await publicApiClient.post<
      ApiSuccessResponse<RegisterResponse> | RegisterResponse
    >(AUTH_ENDPOINTS.register, values);

    return unwrapApiResponse(data);
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
