import {
  type AuthResponse,
  type AuthValidationErrors,
} from '../../api/authTypes';
import { type LoginFormValues } from '../model/loginSchema';

export type LoginValidationErrors = AuthValidationErrors<LoginFormValues>;

type LoginUser = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
};

export type LoginResponse = AuthResponse<LoginUser, LoginValidationErrors>;
