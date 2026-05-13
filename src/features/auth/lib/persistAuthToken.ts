import {
  persistAuthSession,
  type AuthSessionResponse,
} from '@/shared/api/authSession';

export const persistAuthToken = (data: AuthSessionResponse) => {
  persistAuthSession(data);
};
