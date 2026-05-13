import { type RegisterResponse } from '../api/registerTypes';

export const persistAuthToken = (data: RegisterResponse) => {
  const token = data.token ?? data.accessToken;

  if (token) {
    window.localStorage.setItem('accessToken', token);
  }
};
