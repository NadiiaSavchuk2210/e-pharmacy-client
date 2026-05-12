export type NavigationLink = {
  href: string;
  label: string;
};

export const NAV_LINKS = [
  { href: '/home', label: 'Home' },
  { href: '/medicine-store', label: 'Medicine store' },
  { href: '/medicine', label: 'Medicine' },
] as const satisfies readonly NavigationLink[];
