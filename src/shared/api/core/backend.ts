export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://e-pharmacy-backend-z5z2.onrender.com';

export const API_URL = `${BACKEND_URL.replace(/\/$/, '')}/api`;
