'use client';

import { usePathname } from 'next/navigation';

import { AUTH_ROUTES } from '@/widgets/header/constants';

const Footer = () => {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(
    pathname as (typeof AUTH_ROUTES)[number],
  );

  if (isAuthRoute) return null;

  return (
    <div>
      <h1>Footer</h1>
    </div>
  );
};

export default Footer;
