'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { AUTH_ROUTES } from '@/widgets/header/constants';
import { HeaderAuthLinks } from '@/widgets/header/HeaderAuthLinks';
import { HeaderLogo } from '@/widgets/header/HeaderLogo';
import { HeaderNavigation } from '@/widgets/header/HeaderNavigation';
import { HeaderUserAction } from '@/widgets/header/HeaderUserAction';
import { MobileMenu } from '@/widgets/header/MobileMenu';
import { MobileMenuButton } from '@/widgets/header/MobileMenuButton';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = pathname === '/home';
  const isAuthRoute = AUTH_ROUTES.includes(
    pathname as (typeof AUTH_ROUTES)[number],
  );
  const isUser = false;
  const isLoggedInView = isUser;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

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

        <MobileMenuButton
          isOpen={isMenuOpen}
          tone={isHomePage ? 'inverse' : 'brand'}
          onClick={() => setIsMenuOpen((current) => !current)}
        />
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
