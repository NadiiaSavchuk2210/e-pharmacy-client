import { AxiosError } from 'axios';
import { type FormikErrors } from 'formik';

import { type AuthResponse, type AuthValidationErrors } from './authTypes';

export class AuthApiError<TValues extends object> extends Error {
  errors?: AuthValidationErrors<TValues>;

  constructor(message: string, errors?: AuthValidationErrors<TValues>) {
    super(message);
    this.name = 'AuthApiError';
    this.errors = errors;
  }
}

const getAuthErrorMessage = <TValues extends object>(
  data: AuthResponse<unknown, AuthValidationErrors<TValues>> | undefined,
  fallbackMessage: string,
) => {
  if (Array.isArray(data?.message)) {
    return data.message.join('\n');
  }

  return data?.message ?? data?.error ?? fallbackMessage;
};

export const normalizeAuthError = <TValues extends object>(
  error: unknown,
  fallbackMessage: string,
) => {
  if (error instanceof AuthApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | AuthResponse<unknown, AuthValidationErrors<TValues>>
      | undefined;

    return new AuthApiError<TValues>(
      getAuthErrorMessage(data, fallbackMessage),
      data?.errors,
    );
  }

  return new AuthApiError<TValues>(
    error instanceof Error ? error.message : fallbackMessage,
  );
};

export const getAuthFieldErrors = <TValues extends object>(
  errors?: AuthValidationErrors<TValues>,
) => {
  if (!errors) return undefined;

  const { form: _form, ...fieldErrors } = errors;

  return fieldErrors as FormikErrors<TValues>;
};
