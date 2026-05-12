'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { HeaderUserAction } from '@/widgets/header/components/HeaderUserAction';
import { MobileMenu } from '@/widgets/header/components/MobileMenu';
import { AUTH_ROUTES } from '@/widgets/header/constants';
import { useBodyScrollLock } from '@/widgets/header/hooks/useBodyScrollLock';

import { HeaderAuthLinks } from './components/HeaderAuthLinks';
import { HeaderLogo } from './components/HeaderLogo';
import { HeaderNavigation } from './components/HeaderNavigation';
import { MobileMenuButton } from './components/MobileMenuButton';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = pathname === '/home';
  const isAuthRoute = AUTH_ROUTES.includes(
    pathname as (typeof AUTH_ROUTES)[number],
  );
  const isUser = false;
  const isLoggedInView = isUser;

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  if (isAuthRoute) return null;

  return (
    <header className={cn(isHomePage && 'bg-header-brand-bg')}>
      <div className="container | flex w-full items-center justify-between py-space-25 md:py-space-28 xl:py-8">
        <HeaderLogo tone={isHomePage ? 'inverse' : 'default'} />

        <HeaderNavigation pathname={pathname} />

        {isLoggedInView ? (
          <div className="hidden xl:flex">
            <HeaderUserAction inverse={isHomePage} />
          </div>
        ) : (
          <HeaderAuthLinks
            className="hidden xl:flex"
            tone={isHomePage ? 'inverse' : 'brand'}
          />
        )}

        {!isMenuOpen && (
          <MobileMenuButton
            isOpen={false}
            controlsId="mobile-menu"
            hasPopup
            tone={isHomePage ? 'inverse' : 'brand'}
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      <MobileMenu
        isLoggedIn={isLoggedInView}
        isOpen={isMenuOpen}
        pathname={pathname}
        onClose={closeMenu}
      />
    </header>
  );
};

export default Header;
