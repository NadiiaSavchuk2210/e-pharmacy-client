export const AUTH_LOGIN_PATH = '/login';
export const AUTH_REGISTER_PATH = '/register';
export const AUTH_PRIVATE_REDIRECT_PATH = '/medicine';

const authRoutes = new Set([AUTH_LOGIN_PATH, AUTH_REGISTER_PATH]);

const normalizeRedirectPathname = (redirectPath: string) => {
  const redirectPathname = redirectPath.split(/[?#]/)[0];

  if (redirectPathname === '/') return redirectPathname;

  return redirectPathname.replace(/\/+$/, '');
};

export const getSafeAuthRedirect = (
  redirectPath: string | null | undefined,
  fallbackPath = AUTH_PRIVATE_REDIRECT_PATH,
) => {
  const redirectPathname = redirectPath
    ? normalizeRedirectPathname(redirectPath)
    : null;

  if (
    !redirectPath ||
    !redirectPath.startsWith('/') ||
    redirectPath.startsWith('//') ||
    authRoutes.has(redirectPathname ?? '')
  ) {
    return fallbackPath;
  }

  return redirectPath;
};

export const getLoginRedirectHref = (redirectPath: string) => {
  const searchParams = new URLSearchParams();
  searchParams.set('redirect', redirectPath);

  return `${AUTH_LOGIN_PATH}?${searchParams.toString()}`;
};
