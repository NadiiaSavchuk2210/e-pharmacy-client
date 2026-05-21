import type { User } from '@/entities/user';

import {
  type AuthSessionResponse,
  type AuthValidationErrors,
} from '../../api/authTypes';
import { type LoginFormValues } from '../model/loginSchema';

export type LoginValidationErrors = AuthValidationErrors<LoginFormValues>;

export type LoginResponse = AuthSessionResponse<User>;
