import type { User } from '@/entities/user';

import {
  type AuthSessionResponse,
  type AuthValidationErrors,
} from '../../api/authTypes';
import { type RegisterFormValues } from '../model/registerSchema';

export type RegisterValidationErrors =
  AuthValidationErrors<RegisterFormValues>;

export type RegisterResponse = AuthSessionResponse<User>;
