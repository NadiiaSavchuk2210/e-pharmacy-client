import { type RegisterFormValues } from '../model/registerSchema';

export type RegisterValidationErrors = Partial<
  Record<keyof RegisterFormValues | 'form', string>
>;

export type RegisterResponse = {
  message?: string;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  token?: string;
  accessToken?: string;
  errors?: RegisterValidationErrors;
};
