import type { User } from '@/entities/user';
import type { AuthTokenPayload } from '@/shared/api/authSession';

export type AuthSessionWithUser = AuthTokenPayload & {
  user?: User;
};
