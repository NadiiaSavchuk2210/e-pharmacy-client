import {
  AuthApiError,
  normalizeAuthError,
} from '../../api/authError';
import { type LoginFormValues } from '../model/loginSchema';

const FALLBACK_LOGIN_ERROR_MESSAGE = 'Unable to log in';

export class LoginApiError extends AuthApiError<LoginFormValues> {}

export const normalizeLoginError = (error: unknown) => {
  const authError = normalizeAuthError<LoginFormValues>(
    error,
    FALLBACK_LOGIN_ERROR_MESSAGE,
  );

  return new LoginApiError(authError.message, authError.errors);
};
