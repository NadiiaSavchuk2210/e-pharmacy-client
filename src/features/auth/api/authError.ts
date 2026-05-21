import { AxiosError } from 'axios';
import { type FormikErrors } from 'formik';

import { type AuthErrorResponse, type AuthValidationErrors } from './authTypes';

export class AuthApiError<TFormValues extends object> extends Error {
  errors?: AuthValidationErrors<TFormValues>;

  constructor(message: string, errors?: AuthValidationErrors<TFormValues>) {
    super(message);
    this.name = 'AuthApiError';
    this.errors = errors;
  }
}

const getAuthErrorMessage = <TErrorDetails extends object>(
  data: AuthErrorResponse<TErrorDetails> | undefined,
  fallbackMessage: string,
) => {
  if (Array.isArray(data?.message)) {
    return data.message.join('\n');
  }

  return data?.message ?? data?.error ?? fallbackMessage;
};

export const normalizeAuthError = <TFormValues extends object>(
  error: unknown,
  fallbackMessage: string,
): AuthApiError<TFormValues> => {
  if (error instanceof AuthApiError) {
    return error as AuthApiError<TFormValues>;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | AuthErrorResponse<AuthValidationErrors<TFormValues>>
      | undefined;

    return new AuthApiError<TFormValues>(
      getAuthErrorMessage(data, fallbackMessage),
      data?.errors,
    );
  }

  return new AuthApiError<TFormValues>(
    error instanceof Error ? error.message : fallbackMessage,
  );
};

export const getAuthFieldErrors = <TFormValues extends object>(
  errors?: AuthValidationErrors<TFormValues>,
): FormikErrors<TFormValues> | undefined => {
  if (!errors) return undefined;

  const { form: _form, ...fieldErrors } = errors;

  return fieldErrors as FormikErrors<TFormValues>;
};
