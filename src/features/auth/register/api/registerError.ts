import {
  AuthApiError,
  normalizeAuthError,
} from '../../api/authError';
import { type RegisterFormValues } from '../model/registerSchema';

const FALLBACK_REGISTER_ERROR_MESSAGE = 'Unable to register user';

export class RegisterApiError extends AuthApiError<RegisterFormValues> {}

export const normalizeRegisterError = (error: unknown) => {
  const authError = normalizeAuthError<RegisterFormValues>(
    error,
    FALLBACK_REGISTER_ERROR_MESSAGE,
  );

  return new RegisterApiError(authError.message, authError.errors);
};
