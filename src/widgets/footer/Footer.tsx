'use client';

import { usePathname } from 'next/navigation';

import { AUTH_ROUTES } from '@/widgets/header/constants';

import FooterBottom from './components/FooterBottom';
import FooterLogo from './components/FooterLogo';
import FooterNavigation from './components/FooterNavigation';
import FooterSocialLinks from './components/FooterSocialLinks';
import FooterText from './components/FooterText';

const Footer = () => {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(
    pathname as (typeof AUTH_ROUTES)[number],
  );

  if (isAuthRoute) return null;

  return (
    <footer className="bg-accent py-5 md:py-8">
      <div className="container layout-footer">
        <FooterLogo className="area-logo" />
        <FooterText className="area-text" />
        <FooterNavigation
          pathname={pathname}
          className="area-navLinks"
        />
        <FooterSocialLinks className="area-socials hidden gap-space-12 md:flex md:justify-end" />
        <FooterBottom className="area-copyright text-10 md:text-14" />
      </div>
    </footer>
  );
};

export default Footer;
