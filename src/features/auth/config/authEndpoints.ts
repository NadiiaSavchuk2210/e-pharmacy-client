export const AUTH_ENDPOINTS = {
  login: process.env.NEXT_PUBLIC_LOGIN_PATH ?? '/api/user/login',
  logout: process.env.NEXT_PUBLIC_LOGOUT_PATH ?? '/api/user/logout',
  register: process.env.NEXT_PUBLIC_REGISTER_PATH ?? '/api/user/register',
} as const;
