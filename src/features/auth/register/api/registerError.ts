import { AxiosError } from 'axios';

import {
  type RegisterResponse,
  type RegisterValidationErrors,
} from './registerTypes';

const FALLBACK_REGISTER_ERROR_MESSAGE = 'Unable to register user';

export class RegisterApiError extends Error {
  errors?: RegisterValidationErrors;

  constructor(message: string, errors?: RegisterValidationErrors) {
    super(message);
    this.name = 'RegisterApiError';
    this.errors = errors;
  }
}

const getRegisterErrorMessage = (data: RegisterResponse | undefined) => {
  return data?.message ?? data?.error ?? FALLBACK_REGISTER_ERROR_MESSAGE;
};

export const normalizeRegisterError = (error: unknown) => {
  if (error instanceof RegisterApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as RegisterResponse | undefined;

    return new RegisterApiError(getRegisterErrorMessage(data), data?.errors);
  }

  return new RegisterApiError(
    error instanceof Error ? error.message : FALLBACK_REGISTER_ERROR_MESSAGE,
  );
};
