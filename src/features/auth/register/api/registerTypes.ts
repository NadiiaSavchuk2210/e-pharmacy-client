import {
  type AuthResponse,
  type AuthValidationErrors,
} from '../../api/authTypes';
import { type RegisterFormValues } from '../model/registerSchema';

export type RegisterValidationErrors =
  AuthValidationErrors<RegisterFormValues>;

type RegisterUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
};

export type RegisterResponse = AuthResponse<
  RegisterUser,
  RegisterValidationErrors
>;
