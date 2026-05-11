export const NAV_LINKS = [
  { href: '/home', label: 'Home' },
  { href: '/medicine-store', label: 'Medicine store' },
  { href: '/medicine', label: 'Medicine' },
] as const;

export const AUTH_ROUTES = ['/login', '/register'] as const;

export type HeaderTone = 'default' | 'brand' | 'inverse';
